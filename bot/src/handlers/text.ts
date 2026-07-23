import type { Telegraf } from 'telegraf';
import { getAiReply } from '../service/ai.js';
import {
    getChatContext,
    saveBotMessage,
    saveIncomingMessage,
} from '../service/chat.js';

export function registerTextHandler(bot: Telegraf, bootTimeMs: number) {
    bot.on('text', async (ctx) => {
        try {
            const tgChat = ctx.chat;
            const tgUser = ctx.from;
            const text = ctx.message.text;

            const chatS = await ctx.telegram.getChat(ctx.chat.id);

            console.log(chatS);
            console.log(ctx.from);

            if (
                !tgUser ||
                !tgChat ||
                !text ||
                text.startsWith('/') ||
                ctx.message.date * 1000 <= bootTimeMs
            ) {
                return;
            }

            const username =
                tgUser.username ??
                tgUser.first_name ??
                `user_${tgUser.id}`;

            const chat =
                tgChat.type !== 'private'
                    ? { title: tgChat.title }
                    : { title: username };

            const savedMessage = await saveIncomingMessage({
                telegramChatId: tgChat.id,
                telegramUserId: tgUser.id,
                username,
                text,
                chat,
            });

            const repliedMessage = ctx.message.reply_to_message;

            if (repliedMessage?.from?.id !== ctx.botInfo.id) {
                return;
            }

            const context = await getChatContext(savedMessage.chatId);

            console.log('[ai request]', {
                chatId: tgChat.id,
                userId: tgUser.id,
                text,
            });

            const aiAnswer = await getAiReply({
                context,
                username: savedMessage.username,
                text,
            });

            const botAnswer = await ctx.reply(aiAnswer);

            await saveBotMessage(
                savedMessage.chatId,
                savedMessage.botUserId,
                botAnswer.text ?? '',
            );
        } catch (error) {
            console.error('[text handler error]', error);
            await ctx.reply('AI request failed.');
        }
    });
}
