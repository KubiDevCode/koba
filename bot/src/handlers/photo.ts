import type { Telegraf } from 'telegraf';
import { isBotMentioned } from './isBotMentioned.js';
import { addPhotoToEvents } from '../service/event.js';

type PendingMediaGroup = {
    eventTitle: string | null;
    photoIds: string[];
    cleanupTimer: ReturnType<typeof setTimeout>;
};

const pendingMediaGroups = new Map<string, PendingMediaGroup>();
const MEDIA_GROUP_TTL_MS = 15_000;

async function savePhotoToEvent(
    eventTitle: string,
    photoId: string,
) {
    const savedPhoto = await addPhotoToEvents(eventTitle, photoId);

    if (!savedPhoto) {
        console.log('[photo handler] event not found', { eventTitle });
        return;
    }

    console.log('[photo handler] photo saved', {
        eventTitle,
        photoId: savedPhoto.id,
    });
}

export function registerPhototHandler(bot: Telegraf, bootTimeMs: number) {
    bot.on('photo', async (ctx) => {
        try {
            if (ctx.message.date * 1000 <= bootTimeMs) {
                return
            }

            const eventTitle = isBotMentioned(ctx);
            const mediaGroupId = ctx.message.media_group_id;
            const photo = ctx.message.photo.at(-1)?.file_id;

            if (!photo) {
                console.log('[photo handler] photo file_id not found');
                return;
            }

            if (!mediaGroupId) {
                if (eventTitle === null) {
                    return;
                }

                if (!eventTitle) {
                    console.log('[photo handler] empty event title');
                    return;
                }

                await savePhotoToEvent(
                    eventTitle,
                    photo,
                );
                return;
            }

            const pendingGroup =
                pendingMediaGroups.get(mediaGroupId) ??
                {
                    eventTitle: null,
                    photoIds: [],
                    cleanupTimer: setTimeout(() => {
                        pendingMediaGroups.delete(mediaGroupId);
                    }, MEDIA_GROUP_TTL_MS),
                };

            pendingMediaGroups.set(mediaGroupId, pendingGroup);
            pendingGroup.photoIds.push(photo);

            if (eventTitle !== null) {
                pendingGroup.eventTitle = eventTitle;
            }

            if (pendingGroup.eventTitle === null) {
                return;
            }

            if (!pendingGroup.eventTitle) {
                console.log('[photo handler] empty event title');
                return;
            }

            const photosToSave = pendingGroup.photoIds.splice(0);

            for (const photoId of photosToSave) {
                await savePhotoToEvent(
                    pendingGroup.eventTitle,
                    photoId,
                );
            }
        } catch (error) {
            console.error('[text handler error]', error);
            await ctx.reply('AI request failed.');
        }
    });
}
