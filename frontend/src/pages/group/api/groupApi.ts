import api from "../../../shared/api/api";
import type { BackendChat } from "./groupDto";
import { mapChatToGroup } from "../../../shared/mappers/mappers";

export async function getGroups(userId: number) {
    if (!userId) {
        return [];
    }

    const response = await api.get<BackendChat[]>(`/chat/${userId}`);
    return response.data.map(mapChatToGroup);
}
