import { prisma } from './db.js';

export async function addPhotoToEvents(eventToSave: string, photoId: string) {
    const event = await prisma.event.findFirst({
        where: {
            title: eventToSave,
        },
    });

    if (!event) {
        return null;
    }

    return prisma.photo.upsert({
        where: {
            fileId: photoId,
        },
        update: {
            eventId: event.id,
        },
        create: {
            fileId: photoId,
            eventId: event.id,
        },
    });
}
