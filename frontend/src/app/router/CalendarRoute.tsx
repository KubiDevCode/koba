import { useNavigate } from "react-router-dom";
import type { EventWithGroup } from "../../entities/archive";
import { CalendarPage } from "../../pages/calendar";

type Props = {
  events: EventWithGroup[];
};

export function CalendarRoute({ events }: Props) {
  const navigate = useNavigate();

  return (
    <CalendarPage
      events={events}
      onOpenEvent={(event) => navigate(`/groups/${event.group.id}/events/${event.id}`)}
    />
  );
}
