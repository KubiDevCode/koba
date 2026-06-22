import { Router } from "express";
import { AuthMiddleware } from "../AuthMiddleware.js";
import EventController from "./EventController.js";

const router = Router();

router.get('/event/:userId', AuthMiddleware, EventController.getEvent)
router.post('/event', AuthMiddleware, EventController.createEvent)
router.put('/event', AuthMiddleware, EventController.updateEvent)

export default router;
