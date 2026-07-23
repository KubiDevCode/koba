import api from "../../../shared/api/api";
import type {
  BackendEventPhotosResponse,
  BackendEventVideosResponse,
  BackendMedia,
} from "./dto";

export type EventMediaById = Record<string, BackendMedia[]>;

async function getEventMedia(eventId: string) {
  const [photosResponse, videosResponse] = await Promise.all([
    api.get<BackendEventPhotosResponse>(`/event/photos/${eventId}`),
    api.get<BackendEventVideosResponse>(`/event/videos/${eventId}`),
  ]);

  return [...photosResponse.data.photos, ...videosResponse.data.videos];
}

export async function getEventMediaByIds(eventIds: string[]) {
  const uniqueEventIds = [...new Set(eventIds)];

  if (uniqueEventIds.length === 0) {
    return {};
  }

  const entries = await Promise.all(
    uniqueEventIds.map(async (eventId) => {
      try {
        const media = await getEventMedia(eventId);
        return [eventId, media] as const;
      } catch {
        return [eventId, []] as const;
      }
    }),
  );

  return Object.fromEntries(entries) as EventMediaById;
}
