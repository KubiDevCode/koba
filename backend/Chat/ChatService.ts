import { prisma } from "../../bot/src/service/db.js";

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
            include:{
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
        return chats;
    }
}

export default new ChatService();
