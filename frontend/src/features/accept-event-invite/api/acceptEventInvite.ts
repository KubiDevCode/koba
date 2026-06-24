import api from "../../../shared/api/api";

export async function acceptEventInvite(eventId: string) {
  const response = await api.get(`/event/invite/${eventId}`);
  return response.data;
}
