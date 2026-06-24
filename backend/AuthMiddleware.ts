import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export type TelegramAuthUser = {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    allows_write_to_pm?: boolean;
    photo_url?: string;
};

declare global {
    namespace Express {
        interface Request {
            telegramUser?: TelegramAuthUser;
            telegramStartParam?: string;
        }
    }
}

const parseTelegramUser = (userRaw: string | null) => {
    if (!userRaw) {
        return null;
    }

    const user = JSON.parse(userRaw) as TelegramAuthUser;

    if (typeof user.id !== "number") {
        return null;
    }

    return user;
};

export function AuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const [scheme, token] = authorization.split(" ");

        if (scheme !== "tma" || !token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const botToken = process.env.BOT_TOKEN;

        if (!botToken) {
            return res.status(500).json({ error: "Server configuration error" });
        }

        const params = new URLSearchParams(token);

        const hash = params.get("hash");

        if (!hash) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        params.delete("hash");

        const dataCheckString = [...params.entries()]
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, value]) => `${key}=${value}`)
            .join("\n");

        const secretKey = crypto
            .createHmac("sha256", "WebAppData")
            .update(botToken)
            .digest();

        const calculatedHash = crypto
            .createHmac("sha256", secretKey)
            .update(dataCheckString)
            .digest("hex");

        const valid = crypto.timingSafeEqual(
            Buffer.from(calculatedHash, "hex"),
            Buffer.from(hash, "hex"),
        );

        if (!valid) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const telegramUser = parseTelegramUser(params.get("user"));

        if (!telegramUser) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.telegramUser = telegramUser;

        const startParam = params.get("start_param");
        if (startParam) {
            req.telegramStartParam = startParam;
        }

        next();
    } catch {
        return res.status(401).json({ error: "Unauthorized" });
    }
}
