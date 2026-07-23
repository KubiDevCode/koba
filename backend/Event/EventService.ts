import type { Prisma } from "@app/database";
import { prisma } from "../../bot/src/service/db.js"
import { downloadTelegramPhoto } from "../handlers/getPhotoFromFileId.js";

type EventInput = {
    title: string;
    description?: string | null;
    date: Date;
    chatId: string;
    userIds: string[];
};

type UpdateEventInput = Partial<EventInput>;

type EventPhoto = {
    id: string;
    type: "photo";
    src: string;
};

type EventPhotosResult = {
    photos: EventPhoto[];
};

type EventPhotoFile = {
    buffer: Buffer;
    mimeType: string;
};

const eventDataDto = (data: EventInput) => {
    return {
        title: data.title,
        description: data.description ?? null,
        date: data.date,
        chat: {
            connect: { id: data.chatId },
        },
        users: {
            connect: data.userIds.map((id) => ({ id })),
        },
    } satisfies Prisma.EventCreateInput;
}

const eventUpdateDataDto = (data: UpdateEventInput) => {
    return {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.date !== undefined && { date: data.date }),
        ...(data.chatId !== undefined && {
            chat: {
                connect: { id: data.chatId },
            },
        }),
        ...(data.userIds !== undefined && {
            users: {
                set: data.userIds.map((id) => ({ id })),
            },
        }),
    } satisfies Prisma.EventUpdateInput;
}

class EventService {
    async createEvent(data: EventInput) {
        const eventData = eventDataDto(data);

        return prisma.event.create({
            data: eventData,
        });
    }

    async getEvent(userId: string) {
        const event = await prisma.event.findMany({
            where: {
                users: {
                    some: {
                        telegramId: userId
                    }
                }
            },
            include: {
                users: true,
                chat: {
                    include: {
                        users: true,
                    },
                },
            },
        });
        return event;
    }

    async updateEvent(eventId: string, data: UpdateEventInput) {
        const eventUpdateData = eventUpdateDataDto(data);

        return prisma.event.update({
            where: {
                id: eventId,
            },
            data: eventUpdateData,
        });
    }

    async addUserToEvent(eventId: string, userName: string | undefined, tgId: string) {
        const user = await prisma.user.upsert({
            where: {
                telegramId: tgId,
            },
            update: {
                ...(userName !== undefined && { username: userName }),
            },
            create: {
                telegramId: tgId,
                ...(userName !== undefined && { username: userName }),
            },
        });

        return prisma.event.update({
            where: {
                id: eventId,
            },
            data: {
                users: {
                    connect: { id: user.id },
                },
            },
        });
    }

    async getEventPhotos(eventId: string, telegramUserId: string): Promise<EventPhotosResult | null> {
        const event = await prisma.event.findFirst({
            where: {
                id: eventId,
                users: {
                    some: {
                        telegramId: telegramUserId,
                    },
                },
            },
            include: {
                photos: true,
            },
        });

        if (!event) {
            return null;
        }

        return {
            photos: event.photos.map((photo) => ({
                id: photo.id,
                type: "photo",
                src: `/event/photo/${photo.id}`,
            })),
        };
    }

    async getEventPhoto(photoId: string): Promise<EventPhotoFile | null> {
        const photo = await prisma.photo.findUnique({
            where: {
                id: photoId,
            },
        });

        if (!photo) {
            return null;
        }

        return downloadTelegramPhoto(photo.fileId);
    }
}

export default new EventService()
