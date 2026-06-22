import { Markup, type Telegraf } from 'telegraf';

export function registerCommandHandlers(bot: Telegraf, miniAppUrl: string) {
    void bot.telegram.setMyCommands([
        { command: 'start', description: 'Start bot' },
        { command: 'help', description: 'Show help' },
        { command: 'credit', description: 'Open mini app' },
    ]);

    bot.start(async (ctx) => {
        await ctx.reply(`Welcome, ${ctx.from.first_name}`);
    });

    bot.command('help', async (ctx) => {
        await ctx.reply('Available commands:\n/start\n/help\n/credit');
    });

    bot.command('credit', async (ctx) => {
        try {
            const button =
                ctx.chat.type === 'private'
                    ? Markup.button.webApp('Open Mini App', miniAppUrl)
                    : Markup.button.url(
                          'Open Mini App',
                          `https://t.me/${ctx.botInfo.username}?startapp=group_${Math.abs(ctx.chat.id)}`,
                      );

            await ctx.reply(
                'Open the mini app:',
                Markup.inlineKeyboard([[button]]),
            );
        } catch (error) {
            console.error('[/credit error]', error);
            await ctx.reply(
                'Could not send Mini App button. Check MINI_APP_URL and HTTPS.',
            );
        }
    });
}
