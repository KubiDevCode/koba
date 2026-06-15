import { prisma } from './db.js';

const BOT_TELEGRAM_ID = 'BOT';
const BOT_USERNAME = 'TelegramBot';
const CONTEXT_MESSAGE_LIMIT = 35;

type IncomingMessage = {
    telegramChatId: number;
    telegramUserId: number;
    username: string;
    text: string;
};

export async function saveIncomingMessage(message: IncomingMessage) {
    const chat = await prisma.chat.upsert({
        where: {
            telegramId: String(message.telegramChatId),
        },
        update: {},
        create: {
            telegramId: String(message.telegramChatId),
        },
    });

    const botUser = await prisma.user.upsert({
        where: { telegramId: BOT_TELEGRAM_ID },
        update: {
            username: BOT_USERNAME,
        },
        create: {
            telegramId: BOT_TELEGRAM_ID,
            username: BOT_USERNAME,
            chatId: chat.id,
        },
    });

    const user = await prisma.user.upsert({
        where: {
            telegramId: String(message.telegramUserId),
        },
        update: {
            username: message.username,
            chatId: chat.id,
        },
        create: {
            telegramId: String(message.telegramUserId),
            username: message.username,
            chatId: chat.id,
        },
    });

    await prisma.entry.create({
        data: {
            text: message.text,
            userId: user.id,
            chatId: chat.id,
        },
    });

    return {
        chatId: chat.id,
        botUserId: botUser.id,
        username: user.username ?? message.username,
    };
}

export async function getChatContext(chatId: string) {
    const messages = await prisma.entry.findMany({
        where: {
            chatId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: CONTEXT_MESSAGE_LIMIT,
        include: {
            user: true,
        },
    });

    return messages
        .reverse()
        .map((message) => {
            const name = message.user?.username ?? 'Someone';
            return `${name}: ${message.text}`;
        })
        .join('\n');
}

export async function saveBotMessage(
    chatId: string,
    botUserId: string,
    text: string,
) {
    await prisma.entry.create({
        data: {
            text,
            userId: botUserId,
            chatId,
        },
    });
}
