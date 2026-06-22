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

}

export default new ChatController();