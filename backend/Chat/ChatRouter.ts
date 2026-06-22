import { Router } from "express";
import { AuthMiddleware } from "../AuthMiddleware.js";
import ChatController from "./ChatController.js";

const router = Router();

router.get('/chat/:userId', AuthMiddleware, ChatController.getChat)

export default router;
