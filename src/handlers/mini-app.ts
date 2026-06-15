import type { Telegraf } from 'telegraf';

export function registerMiniAppHandler(bot: Telegraf) {
    bot.on('message', async (ctx, next) => {
        const message = ctx.message as {
            web_app_data?: { data?: string };
        };

        if (message.web_app_data?.data) {
            console.log('[miniapp raw]', message.web_app_data.data);
            console.log('[miniapp meta]', {
                chatId: ctx.chat?.id,
                userId: ctx.from?.id,
                username: ctx.from?.username,
            });

            try {
                const payload = JSON.parse(message.web_app_data.data);
                console.log('[miniapp json]', payload);

                await ctx.reply(
                    `Mini App data:\n${JSON.stringify(payload, null, 2)}`,
                );
            } catch (error) {
                console.error('[miniapp parse error]', error);
                await ctx.reply('Mini App sent data, but JSON parsing failed.');
            }
        }

        await next();
    });
}
