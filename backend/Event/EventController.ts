import type { Request, Response } from "express"
import EventService from "./EventService.js"
class EventController {
    async getEvent(req: Request, res: Response) {
        try {
            const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId

            if (!userId) {
                return res.status(400).json({ error: "userId is required" })
            }

            const event = await EventService.getEvent(userId)

            if (!event) {
                return res.status(404).json({ error: "Event not found" })
            }

            return res.status(200).json(event)
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" })
        }
    }


    async createEvent(req: Request, res: Response) {
        try {
            const { data } = req.body

            if (!data) {
                return res.status(400).json({ error: "Event data is required" })
            }

            const event = await EventService.createEvent(data)

            if (!event) {
                return res.status(404).json({ error: "Event not found" })
            }

            return res.status(200).json(event)
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" })
        }
    }

    async updateEvent(req: Request, res: Response) {
        try {
            const { userId, data } = req.body

            if (!userId) {
                return res.status(400).json({ error: "userId is required" })
            }

            if (!data) {
                return res.status(400).json({ error: "Event data is required" })
            }

            const event = await EventService.updateEvent(userId, data)

            if (!event) {
                return res.status(404).json({ error: "Event not found" })
            }

            return res.status(200).json(event)
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}

export default new EventController()