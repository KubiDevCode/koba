import type { Telegraf } from 'telegraf';
import {
    clearGroupAvatar,
    saveGroupAvatar,
} from '../service/chat.js';

export function registerAvatarGroup(bot: Telegraf) {
    bot.on('new_chat_photo', async (ctx) => {
        const photo = ctx.message.new_chat_photo.at(-1);

        if (!photo) {
            return;
        }

        try {
            await saveGroupAvatar(
                String(ctx.chat.id),
                photo.file_id,
                'title' in ctx.chat ? ctx.chat.title : undefined,
            );
        } catch (error) {
            console.log(error);
        }
    });

    bot.on('delete_chat_photo', async (ctx) => {
        try {
            await clearGroupAvatar(String(ctx.chat.id));
        } catch (error) {
            console.log(error);
        }
    });
}
