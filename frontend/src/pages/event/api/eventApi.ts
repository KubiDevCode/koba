import api from "../../../shared/api/api";
import { mapEvent } from "../../../shared/mappers/mappers";
import type { BackendChat, BackendEvent } from "../../group/api/groupDto";

type BackendEventWithChat = BackendEvent & {
    chat: Pick<BackendChat, "id" | "title" | "users">;
};

export async function getEventsByUserId(userId: number) {
    if (!userId) {
        return [];
    }

    const response = await api.get<BackendEventWithChat[]>(`/event/${userId}`);
    return response.data.map((event) =>
        mapEvent(
            event,
            event.chat.title?.trim() || "Группа без названия",
            Number.parseInt(event.chat.id.slice(-6), 36) || event.chat.id.length,
        ),
    );
}
