import { createReadStream } from "node:fs";
import { google } from "googleapis";

const DEFAULT_YOUTUBE_SCOPES = [
    "https://www.googleapis.com/auth/youtube.force-ssl",
];

type OAuthTokens = {
    accessToken?: string | null | undefined;
    refreshToken?: string | null | undefined;
    scope?: string | null | undefined;
    expiryDate?: number | null | undefined;
};

type PrivacyStatus = "private" | "unlisted" | "public";

type UploadVideoInput = {
    filePath: string;
    mimeType: string;
    title: string;
    description?: string | undefined;
    privacyStatus?: PrivacyStatus | undefined;
    tags?: string[] | undefined;
    categoryId?: string | undefined;
    notifySubscribers?: boolean | undefined;
    madeForKids?: boolean | undefined;
};

export class YouTubeConfigError extends Error {
    constructor(public readonly missing: string[]) {
        super(`Missing YouTube OAuth config: ${missing.join(", ")}`);
    }
}

function env(name: string) {
    const value = process.env[name]?.trim();
    return value ? value : undefined;
}

function backendBaseUrl() {
    const baseUrl = env("BACKEND_URL");

    if (baseUrl) {
        return baseUrl.replace(/\/+$/, "");
    }

    return `http://localhost:${env("PORT_BACKEND") ?? "5000"}`;
}

function redirectUri() {
    return env("YOUTUBE_REDIRECT_URI") ?? `${backendBaseUrl()}/oauth2callback`;
}

function youtubeScopes() {
    const scopes = env("YOUTUBE_SCOPES");

    if (!scopes) {
        return DEFAULT_YOUTUBE_SCOPES;
    }

    return scopes
        .split(/[,\s]+/)
        .map((scope) => scope.trim())
        .filter(Boolean);
}

function requireOAuthClientConfig() {
    const clientId = env("YOUTUBE_CLIENT_ID");
    const clientSecret = env("YOUTUBE_CLIENT_SECRET");
    const missing = [
        !clientId && "YOUTUBE_CLIENT_ID",
        !clientSecret && "YOUTUBE_CLIENT_SECRET",
    ].filter(Boolean) as string[];

    if (missing.length > 0) {
        throw new YouTubeConfigError(missing);
    }

    return {
        clientId,
        clientSecret,
        redirectUri: redirectUri(),
    };
}

function createOAuthClient() {
    const config = requireOAuthClientConfig();

    return new google.auth.OAuth2(
        config.clientId,
        config.clientSecret,
        config.redirectUri,
    );
}

class YouTubeService {
    getStatus() {
        const clientId = env("YOUTUBE_CLIENT_ID");
        const clientSecret = env("YOUTUBE_CLIENT_SECRET");
        const refreshToken = env("YOUTUBE_REFRESH_TOKEN");
        const missingForAuthUrl = [
            !clientId && "YOUTUBE_CLIENT_ID",
            !clientSecret && "YOUTUBE_CLIENT_SECRET",
        ].filter(Boolean) as string[];

        return {
            clientConfigured: missingForAuthUrl.length === 0,
            authorized: Boolean(refreshToken),
            missingForAuthUrl,
            missingForApiCalls: [
                ...missingForAuthUrl,
                !refreshToken && "YOUTUBE_REFRESH_TOKEN",
            ].filter(Boolean),
            redirectUri: redirectUri(),
            scopes: youtubeScopes(),
            authPath: "/youtube/auth",
            callbackPaths: ["/oauth2callback", "/youtube/oauth/callback"],
        };
    }

    getAuthUrl() {
        const oauth2Client = createOAuthClient();

        return oauth2Client.generateAuthUrl({
            access_type: "offline",
            prompt: "consent",
            include_granted_scopes: true,
            scope: youtubeScopes(),
        });
    }

    async exchangeCode(code: string): Promise<OAuthTokens> {
        const oauth2Client = createOAuthClient();
        const { tokens } = await oauth2Client.getToken(code);

        return {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            scope: tokens.scope,
            expiryDate: tokens.expiry_date,
        };
    }

    private getAuthorizedClient() {
        const refreshToken = env("YOUTUBE_REFRESH_TOKEN");

        if (!refreshToken) {
            throw new YouTubeConfigError(["YOUTUBE_REFRESH_TOKEN"]);
        }

        const oauth2Client = createOAuthClient();
        oauth2Client.setCredentials({
            refresh_token: refreshToken,
        });

        return oauth2Client;
    }

    async getMyChannel() {
        const auth = this.getAuthorizedClient();
        const youtube = google.youtube({
            version: "v3",
            auth,
        });

        const response = await youtube.channels.list({
            mine: true,
            part: ["id", "snippet", "statistics"],
        });

        const channel = response.data.items?.[0];

        if (!channel) {
            return null;
        }

        return {
            id: channel.id,
            title: channel.snippet?.title,
            description: channel.snippet?.description,
            customUrl: channel.snippet?.customUrl,
            thumbnails: channel.snippet?.thumbnails,
            statistics: channel.statistics,
        };
    }

    async uploadVideo(input: UploadVideoInput) {
        const auth = this.getAuthorizedClient();
        const youtube = google.youtube({
            version: "v3",
            auth,
        });

        const response = await youtube.videos.insert({
            part: ["id", "snippet", "status"],
            ...(input.notifySubscribers !== undefined && {
                notifySubscribers: input.notifySubscribers,
            }),
            requestBody: {
                snippet: {
                    title: input.title,
                    description: input.description ?? "",
                    ...(input.tags?.length && { tags: input.tags }),
                    ...(input.categoryId && { categoryId: input.categoryId }),
                },
                status: {
                    privacyStatus: input.privacyStatus ?? "private",
                    selfDeclaredMadeForKids: input.madeForKids ?? false,
                },
            },
            media: {
                mimeType: input.mimeType,
                body: createReadStream(input.filePath),
            },
        });

        const videoId = response.data.id;

        if (!videoId) {
            throw new Error("YouTube did not return a video id");
        }

        return {
            youtubeVideoId: videoId,
            title: response.data.snippet?.title ?? input.title,
            description: response.data.snippet?.description ?? input.description ?? "",
            privacyStatus:
                response.data.status?.privacyStatus ?? input.privacyStatus ?? "private",
            watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
            thumbnailUrl: response.data.snippet?.thumbnails?.high?.url
                ?? response.data.snippet?.thumbnails?.medium?.url
                ?? response.data.snippet?.thumbnails?.default?.url
                ?? null,
        };
    }
}

export default new YouTubeService();
