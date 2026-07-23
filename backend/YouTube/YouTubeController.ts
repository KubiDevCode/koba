import { unlink } from "node:fs/promises";
import type { Request, Response } from "express";
import YouTubeService, { YouTubeConfigError } from "./YouTubeService.js";

const YOUTUBE_PRIVACY_STATUSES = ["private", "unlisted", "public"] as const;

type PrivacyStatus = (typeof YOUTUBE_PRIVACY_STATUSES)[number];

function queryString(value: unknown) {
    if (Array.isArray(value)) {
        return typeof value[0] === "string" ? value[0] : undefined;
    }

    return typeof value === "string" ? value : undefined;
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function sendConfigError(res: Response, error: YouTubeConfigError) {
    return res.status(500).json({
        error: "YouTube OAuth is not configured",
        missing: error.missing,
        statusPath: "/youtube/status",
    });
}

function bodyString(value: unknown) {
    if (Array.isArray(value)) {
        return typeof value[0] === "string" ? value[0].trim() : undefined;
    }

    return typeof value === "string" ? value.trim() : undefined;
}

function parsePrivacyStatus(value: unknown): PrivacyStatus | null | undefined {
    const status = bodyString(value);

    if (!status) {
        return undefined;
    }

    if (YOUTUBE_PRIVACY_STATUSES.includes(status as PrivacyStatus)) {
        return status as PrivacyStatus;
    }

    return null;
}

function parseBoolean(value: unknown) {
    const text = bodyString(value)?.toLowerCase();

    if (!text) {
        return undefined;
    }

    if (["true", "1", "yes", "on"].includes(text)) {
        return true;
    }

    if (["false", "0", "no", "off"].includes(text)) {
        return false;
    }

    return undefined;
}

function parseTags(value: unknown) {
    const text = bodyString(value);

    if (!text) {
        return undefined;
    }

    return text
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
}

async function removeUploadedFile(filePath: string) {
    try {
        await unlink(filePath);
    } catch (error) {
        console.error("[youtube temp cleanup error]", error);
    }
}

class YouTubeController {
    status(_req: Request, res: Response) {
        return res.status(200).json(YouTubeService.getStatus());
    }

    auth(req: Request, res: Response) {
        try {
            const authUrl = YouTubeService.getAuthUrl();

            if (queryString(req.query.format) === "json") {
                return res.status(200).json({ authUrl });
            }

            return res.redirect(authUrl);
        } catch (error) {
            if (error instanceof YouTubeConfigError) {
                return sendConfigError(res, error);
            }

            console.error("[youtube auth error]", error);
            return res.status(500).json({ error: "YouTube auth failed" });
        }
    }

    async callback(req: Request, res: Response) {
        try {
            const errorMessage = queryString(req.query.error);

            if (errorMessage) {
                return res.status(400).send(`Google OAuth error: ${escapeHtml(errorMessage)}`);
            }

            const code = queryString(req.query.code);

            if (!code) {
                return res.status(400).send("Missing OAuth code");
            }

            const tokens = await YouTubeService.exchangeCode(code);

            if (!tokens.refreshToken) {
                return res.status(200).send(`
                    <h1>YouTube OAuth connected</h1>
                    <p>Google did not return a refresh token. Open <a href="/youtube/auth">/youtube/auth</a> again and choose the channel account.</p>
                `);
            }

            const refreshToken = escapeHtml(tokens.refreshToken);
            const scope = escapeHtml(tokens.scope ?? "");

            return res.status(200).send(`
                <h1>YouTube OAuth connected</h1>
                <p>Add this value to your .env and restart backend:</p>
                <pre>YOUTUBE_REFRESH_TOKEN=${refreshToken}</pre>
                <p>Granted scope:</p>
                <pre>${scope}</pre>
                <p>After restart, open <a href="/youtube/channel">/youtube/channel</a>.</p>
            `);
        } catch (error) {
            if (error instanceof YouTubeConfigError) {
                return sendConfigError(res, error);
            }

            console.error("[youtube callback error]", error);
            return res.status(500).json({ error: "YouTube OAuth callback failed" });
        }
    }

    async channel(_req: Request, res: Response) {
        try {
            const channel = await YouTubeService.getMyChannel();

            if (!channel) {
                return res.status(404).json({ error: "YouTube channel not found" });
            }

            return res.status(200).json(channel);
        } catch (error) {
            if (error instanceof YouTubeConfigError) {
                return sendConfigError(res, error);
            }

            console.error("[youtube channel error]", error);
            return res.status(500).json({ error: "YouTube channel request failed" });
        }
    }

    async uploadVideo(req: Request, res: Response) {
        const file = req.file;

        try {
            if (!file) {
                return res.status(400).json({ error: "video file is required" });
            }

            const title = bodyString(req.body.title);

            if (!title) {
                return res.status(400).json({ error: "title is required" });
            }

            const privacyStatus = parsePrivacyStatus(req.body.privacyStatus);

            if (privacyStatus === null) {
                return res.status(400).json({
                    error: "privacyStatus must be private, unlisted, or public",
                });
            }

            const uploadedVideo = await YouTubeService.uploadVideo({
                eventId: bodyString(req.body.eventId),
                filePath: file.path,
                mimeType: file.mimetype,
                title,
                description: bodyString(req.body.description),
                privacyStatus,
                tags: parseTags(req.body.tags),
                categoryId: bodyString(req.body.categoryId),
                notifySubscribers: parseBoolean(req.body.notifySubscribers),
                madeForKids: parseBoolean(req.body.madeForKids),
            });

            return res.status(201).json(uploadedVideo);
        } catch (error) {
            if (error instanceof YouTubeConfigError) {
                return sendConfigError(res, error);
            }

            console.error("[youtube upload error]", error);
            return res.status(500).json({ error: "YouTube video upload failed" });
        } finally {
            if (file?.path) {
                await removeUploadedFile(file.path);
            }
        }
    }
}

export default new YouTubeController();
