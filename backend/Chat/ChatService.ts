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
                users: true
            }
        })
        return chats;
    }
}

export default new ChatService();