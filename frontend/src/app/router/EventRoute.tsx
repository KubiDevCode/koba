import { useNavigate, useParams } from "react-router-dom";
import { EventPage } from "../../pages/event";
import { useArchiveEventWithGroup } from "../model/useArchiveSelectors";
import { EmptyState } from "../ui/EmptyState";

export function EventRoute() {
  const navigate = useNavigate();
  const { groupId, eventId } = useParams();
  const event = useArchiveEventWithGroup(groupId, eventId);

  if (!event) {
    return (
      <EmptyState
        title="Событие не найдено"
        onBack={() => navigate("/groups")}
      />
    );
  }

  return (
    <EventPage
      event={event}
      group={event.group}
      onBack={() => navigate(`/groups/${event.group.id}`)}
    />
  );
}
