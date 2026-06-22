import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";

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

        next();
    } catch {
        return res.status(401).json({ error: "Unauthorized" });
    }
}