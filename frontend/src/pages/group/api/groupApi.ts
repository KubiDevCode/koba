import api from "../../../shared/api/api";
import { getEventMediaByIds } from "../../../entities/archive/api/eventMediaApi";
import type { BackendChat } from "./groupDto";
import { mapChatToGroup } from "../../../shared/mappers/mappers";

export async function getGroups(userId: number) {
    if (!userId) {
        return [];
    }

    const response = await api.get<BackendChat[]>(`/chat/${userId}`);
    const eventIds = response.data.flatMap((chat) =>
        chat.events.map((event) => event.id),
    );
    const mediaByEventId = await getEventMediaByIds(eventIds);

    return response.data.map((chat) => mapChatToGroup(chat, mediaByEventId));
}
