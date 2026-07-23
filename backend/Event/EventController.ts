import type { Request, Response } from "express"
import EventService from "./EventService.js"
import type { TelegramAuthUser } from "../AuthMiddleware.js"

class EventController {
    async getEvent(req: Request, res: Response) {
        try {
            const userId = req.telegramUser?.id

            if (!userId) {
                return res.status(400).json({ error: "userId is required" })
            }

            const event = await EventService.getEvent(String(userId))

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

    async addUserToEvent(req: Request, res: Response) {
        try {
            const { username, id } = req.telegramUser as TelegramAuthUser
            const { eventId } = Array.isArray(req.params) ? req.params[0] : req.params

            if (!id || !eventId) {
                return res.status(400).json({ error: 'Нет необходимых данных' })
            }

            const event = await EventService.addUserToEvent(eventId, username, String(id))

            return res.status(200).json(event)

        } catch (error) {
            res.status(500).json({ error: "Internal server error" })
        }
    }
    async getEventPhotos(req: Request, res: Response) {
        try {
            const { id } = req.telegramUser as TelegramAuthUser
            const { eventId } = Array.isArray(req.params) ? req.params[0] : req.params

            if (!id || !eventId) {
                return res.status(400).json({ error: 'Нет необходимых данных' })
            }

            const result = await EventService.getEventPhotos(eventId, String(id))

            if (!result) {
                return res.status(404).json({ error: "Event not found" })
            }

            return res.status(200).json(result)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }
    async getEventPhoto(req: Request, res: Response) {
        try {
            const { photoId } = Array.isArray(req.params) ? req.params[0] : req.params

            if (!photoId) {
                return res.status(400).json({ error: "photoId is required" })
            }

            const photo = await EventService.getEventPhoto(photoId)

            if (!photo) {
                return res.status(404).json({ error: "Photo not found" })
            }

            res.setHeader("Content-Type", photo.mimeType)
            res.setHeader("Cache-Control", "public, max-age=3600")
            return res.send(photo.buffer)
        } catch (error) {
            console.log(error)
            return res.status(502).json({ error: "Photo download failed" })
        }
    }
}

export default new EventController()
