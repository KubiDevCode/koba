import type {
    ArchiveEvent,
    EventWithGroup,
    Group,
    Media,
    Participant,
} from "../../entities/archive";
import type {
    BackendChat,
    BackendEvent,
    BackendUser,
} from "../../pages/group/api/groupDto";

const fallbackCover =
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85";
const fallbackAvatar =
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85";

export function mapChatToGroup(chat: BackendChat): Group {
    const groupId = toNumberId(chat.id);
    const title = chat.title?.trim() || "Группа без названия";

    return {
        id: groupId,
        name: title,
        members: chat.users.length,
        role: "Участник",
        cover: fallbackCover,
        avatar: fallbackAvatar,
        events: chat.events.map((event) => mapEvent(event, title, groupId)),
    };
}

export function mapEvent(
    event: BackendEvent,
    groupTitle: string,
    groupId: number,
): ArchiveEvent {
    const date = new Date(event.date);
    const validDate = !Number.isNaN(date.getTime());

    return {
        id: toNumberId(event.id),
        groupId,
        title: event.title,
        date: validDate ? formatDate(date) : "Без даты",
        shortDate: validDate ? formatShortDate(date) : "Скоро",
        time: validDate ? formatTime(date) : "--:--",
        location: groupTitle,
        description:
            event.description ?? "Описание события пока не добавлено.",
        cover: fallbackCover,
        media: getFallbackMedia(event.id),
        participants: mapParticipants(event.users),
    };
}

export function mapEventWithGroup(
    event: BackendEvent & { chat: Pick<BackendChat, "id" | "title" | "users"> },
): EventWithGroup {
    const groupId = toNumberId(event.chat.id);
    const title = event.chat.title?.trim() || "Группа без названия";
    const archiveEvent = mapEvent(event, title, groupId);
    const group: Group = {
        id: groupId,
        name: title,
        members: event.chat.users.length,
        role: "Участник",
        cover: fallbackCover,
        avatar: fallbackAvatar,
        events: [archiveEvent],
    };

    return {
        ...archiveEvent,
        group,
    };
}

function mapParticipants(users: BackendUser[]): Participant[] {
    return users.map((user, index) => ({
        id: index + 1,
        name: user.firstName ?? user.username ?? "Участник",
        avatar: fallbackAvatar,
    }));
}

function getFallbackMedia(eventId: string): Media[] {
    const suffix = toNumberId(eventId);

    return [
        {
            id: suffix * 10 + 1,
            type: "photo",
            src: fallbackCover,
        },
        {
            id: suffix * 10 + 2,
            type: "video",
            duration: "0:42",
            src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
        },
    ];
}

function toNumberId(id: string) {
    return Number.parseInt(id.slice(-6), 36) || id.length;
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}

function formatShortDate(date: Date) {
    return new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "short",
    }).format(date);
}

function formatTime(date: Date) {
    return new Intl.DateTimeFormat("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}
