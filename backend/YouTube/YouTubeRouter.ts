import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { AuthMiddleware } from "../AuthMiddleware.js";
import YouTubeController from "./YouTubeController.js";

const router = Router();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(currentDir, "../tmp/youtube-uploads");
const maxUploadSizeMb = Number(process.env.YOUTUBE_UPLOAD_MAX_MB ?? 2048);

const upload = multer({
    dest: uploadDir,
    limits: {
        fileSize: maxUploadSizeMb * 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
        if (
            file.mimetype.startsWith("video/")
            || file.mimetype === "application/octet-stream"
        ) {
            cb(null, true);
            return;
        }

        cb(new Error("Only video files are allowed"));
    },
});

function parseVideoUpload(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    upload.single("video")(req, res, (error) => {
        if (!error) {
            next();
            return;
        }

        if (error instanceof multer.MulterError) {
            return res.status(400).json({
                error: "Video file upload failed",
                code: error.code,
                message: error.message,
            });
        }

        return res.status(400).json({
            error: error instanceof Error
                ? error.message
                : "Video file upload failed",
        });
    });
}

router.get("/youtube/status", YouTubeController.status);
router.get("/youtube/auth", YouTubeController.auth);
router.get("/youtube/channel", YouTubeController.channel);
router.post(
    "/youtube/videos",
    AuthMiddleware,
    parseVideoUpload,
    YouTubeController.uploadVideo,
);
router.get("/oauth2callback", YouTubeController.callback);
router.get("/youtube/oauth/callback", YouTubeController.callback);

export default router;
