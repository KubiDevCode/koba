import { useNavigate, useParams } from "react-router-dom";
import type {
  ArchiveEvent,
  EventWithGroup,
  Group,
  Media,
} from "../../entities/archive";
import { EventPage } from "../../pages/event";
import { EmptyState } from "../ui/EmptyState";

type Props = {
  groups: Group[];
  events: EventWithGroup[];
  onOpenMedia: (event: ArchiveEvent, media: Media) => void;
  onOpenParticipants: (event: ArchiveEvent) => void;
};

export function EventRoute({
  groups,
  events,
  onOpenMedia,
  onOpenParticipants,
}: Props) {
  const navigate = useNavigate();
  const { groupId, eventId } = useParams();
  const event = events.find(
    (item) => String(item.id) === eventId && String(item.group.id) === groupId,
  );
  const group = groups.find((item) => String(item.id) === groupId) ?? event?.group;

  if (!group || !event) {
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
      group={group}
      onBack={() => navigate(`/groups/${group.id}`)}
      onOpenMedia={(media) => onOpenMedia(event, media)}
      onOpenParticipants={() => onOpenParticipants(event)}
    />
  );
}
