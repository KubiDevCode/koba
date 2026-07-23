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
  BackendEventWithChat,
  BackendMedia,
  BackendUser,
} from "../../entities/archive/api/dto";
import type { EventMediaById } from "../../entities/archive/api/eventMediaApi";

const fallbackCover =
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85";
const fallbackAvatar =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=85";

export function mapChatToGroup(
  chat: BackendChat,
  eventMediaById: EventMediaById = {},
): Group {
  const groupId = toNumberId(chat.id);
  const title = chat.title?.trim() || "Группа без названия";

  return {
    id: groupId,
    name: title,
    members: chat.users.length,
    role: "Участник",
    cover: fallbackCover,
    avatar: chat.avatar ?? fallbackAvatar,
    events: chat.events.map((event) =>
      mapEvent(event, title, groupId, eventMediaById[event.id]),
    ),
  };
}

export function mapEvent(
  event: BackendEvent,
  groupTitle: string,
  groupId: number,
  media: BackendMedia[] = event.photos ?? [],
): ArchiveEvent {
  const date = new Date(event.date);
  const validDate = !Number.isNaN(date.getTime());

  return {
    id: event.id,
    groupId,
    title: event.title,
    date: validDate ? formatDate(date) : "Без даты",
    shortDate: validDate ? formatShortDate(date) : "Скоро",
    time: validDate ? formatTime(date) : "--:--",
    location: groupTitle,
    description: event.description ?? "Описание события пока не добавлено.",
    cover: fallbackCover,
    media: mapMedia(media),
    participants: mapParticipants(event.users),
  };
}

export function mapEventWithGroup(
  event: BackendEventWithChat,
  media: BackendMedia[] = event.photos ?? [],
): EventWithGroup {
  const groupId = toNumberId(event.chat.id);
  const title = event.chat.title?.trim() || "Группа без названия";
  const archiveEvent = mapEvent(event, title, groupId, media);
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

function mapMedia(media: BackendMedia[]): Media[] {
  return media.map((item) => ({
    id: item.id,
    type: item.type,
    src: item.src,
    ...(item.duration !== undefined && { duration: item.duration }),
    ...(item.embedUrl !== undefined && { embedUrl: item.embedUrl }),
    ...(item.watchUrl !== undefined && { watchUrl: item.watchUrl }),
    ...(item.thumbnailUrl !== undefined && { thumbnailUrl: item.thumbnailUrl }),
    ...(item.youtubeVideoId !== undefined && {
      youtubeVideoId: item.youtubeVideoId,
    }),
    ...(item.title !== undefined && { title: item.title }),
  }));
}

function mapParticipants(users: BackendUser[]): Participant[] {
  return users.map((user) => ({
    id: user.id,
    name: user.firstName ?? user.username ?? "Участник",
    avatar: fallbackAvatar,
  }));
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
