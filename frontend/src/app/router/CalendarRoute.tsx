import { useNavigate } from "react-router-dom";
import { CalendarPage } from "../../pages/calendar";
import { useArchiveEventsWithGroups } from "../model/useArchiveSelectors";

export function CalendarRoute() {
  const navigate = useNavigate();
  const events = useArchiveEventsWithGroups();

  return (
    <CalendarPage
      events={events}
      onOpenEvent={(event) => navigate(`/groups/${event.group.id}/events/${event.id}`)}
    />
  );
}
