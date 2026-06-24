import type { Prisma } from "@app/database";
import { prisma } from "../../bot/src/service/db.js"

type EventInput = {
    title: string;
    description?: string | null;
    date: Date;
    chatId: string;
    userIds: string[];
};

type UpdateEventInput = Partial<EventInput>;

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
}

export default new EventService()
