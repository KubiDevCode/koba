import { Telegraf } from 'telegraf';
import { appConfig } from './config.js';
import { registerCommandHandlers } from './handlers/commands.js';
import { registerMiniAppHandler } from './handlers/mini-app.js';
import { registerTextHandler } from './handlers/text.js';
import { registerPhototHandler } from './handlers/photo.js';
import { registerAvatarGroup } from './handlers/groupAvatar.js';

const bot = new Telegraf(appConfig.botToken);
const bootTimeMs = Date.now();

registerCommandHandlers(bot, appConfig.miniAppUrl);
registerMiniAppHandler(bot);
registerTextHandler(bot, bootTimeMs);
registerPhototHandler(bot, bootTimeMs)
registerAvatarGroup(bot)

bot.catch((error) => {
    console.error('[bot catch]', error);
});

bot
    .launch()
    .then(() => {
        console.log('Bot started');
    })
    .catch((error) => {
        console.error('Bot launch error:', error);
    });

process.once('SIGINT', () => {
    bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
});
