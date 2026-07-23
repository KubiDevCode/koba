import type { Context, NarrowedContext } from 'telegraf';
import type { Message, Update } from 'telegraf/types';

type MessageWithBotReference =
    | Message.TextMessage
    | Message.PhotoMessage;

type BotCtx<T extends MessageWithBotReference> = NarrowedContext<
    Context<Update>,
    Update.MessageUpdate<T>
>;

export function isBotMentioned<T extends MessageWithBotReference>(
    ctx: BotCtx<T>,
) {
    const botUsername = ctx.botInfo.username?.toLowerCase();

    const content =
        'text' in ctx.message ? ctx.message.text : (ctx.message.caption ?? '');

    const entities =
        'entities' in ctx.message
            ? (ctx.message.entities ?? [])
            : ('caption_entities' in ctx.message
                ? (ctx.message.caption_entities ?? [])
                : []);

    if (!botUsername) {
        return null;
    }

    for (const entity of entities) {
        if (entity.type !== 'mention') {
            continue;
        }

        const mention = content.slice(
            entity.offset,
            entity.offset + entity.length,
        );

        if (mention.toLowerCase() !== `@${botUsername}`) {
            continue;
        }

        const messageWithoutMention = (
            content.slice(0, entity.offset) +
            content.slice(entity.offset + entity.length)
        ).trim();

        return messageWithoutMention;
    }

    return null;
}
