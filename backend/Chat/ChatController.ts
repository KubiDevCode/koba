import type { Request, Response } from "express";
import ChatService from "./ChatService.js";

class ChatController {

    async getChat(req: Request, res: Response) {
        try {
            const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId

            if (!userId) {
                return res.status(400).json({ error: "userId is required" })
            }

            const chats = await ChatService.getChat(userId);

            if (!chats) {
                res.status(404).json({ error: "Chat not found" });
                return;
            }

            res.status(200).json(chats);
        } catch (error) {
            console.error("Error fetching chat:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async getChatAvatar(req: Request, res: Response) {
        try {
            const chatId = Array.isArray(req.params.chatId) ? req.params.chatId[0] : req.params.chatId

            if (!chatId) {
                return res.status(400).json({ error: "chatId is required" })
            }

            const chatsAvatar = await ChatService.getChatAvatar(chatId);
            
            if (!chatsAvatar) {
                return res.status(404).json({ error: "Chat avatar not found" });
            }

            res.setHeader("Content-Type", chatsAvatar.mimeType)
            res.setHeader("Cache-Control", "public, max-age=3600")
            
            return res.send(chatsAvatar.buffer)
        } catch (error) {
            console.error("Error fetching chat:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default new ChatController();
