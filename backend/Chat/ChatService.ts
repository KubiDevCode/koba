import { prisma } from "../../bot/src/service/db.js";
import { downloadTelegramPhoto } from "../handlers/getPhotoFromFileId.js";

type ChatAvatarFile = {
    buffer: Buffer;
    mimeType: string;
}

class ChatService {
    async getChat(tgId: string) {
        const chats = await prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        telegramId: tgId
                    }
                }
            },
            include: {
                users: true,
                events: {
                    include: {
                        users: true,
                    },
                    orderBy: {
                        date: "desc",
                    },
                },
            }
        })
        return chats.map(chat => ({
            ...chat,
            avatar: chat.avatarFileId ? `/chat/${chat.id}/avatar` : null
        }));
    }

    async getChatAvatar(chatId: string): Promise<ChatAvatarFile | null> {
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId,
            },
            select: {
                avatarFileId: true
            }
        });
        if (chat?.avatarFileId) {
            const file = await downloadTelegramPhoto(chat.avatarFileId);
            if (!file) return null;
            return {
                buffer: file.buffer,
                mimeType: file.mimeType,
            };
        }
        return null;
    }
}

export default new ChatService();
