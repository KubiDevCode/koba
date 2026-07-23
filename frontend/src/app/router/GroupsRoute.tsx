import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArchiveUiStore } from "../../entities/archive";
import { GroupsPage } from "../../pages/groups";
import {
  useArchiveEventsWithGroups,
  useArchiveGroups,
} from "../model/useArchiveSelectors";
import { getTelegramFirstName } from "../../shared/lib/telegram";

export function GroupsRoute() {
  const navigate = useNavigate();
  const [userName] = useState(getTelegramFirstName);
  const groups = useArchiveGroups();
  const events = useArchiveEventsWithGroups();
  const openInvite = useArchiveUiStore((state) => state.openInvite);

  return (
    <GroupsPage
      userName={userName}
      groups={groups}
      events={events}
      onOpenGroup={(group) => navigate(`/groups/${group.id}`)}
      onOpenEvent={(event) => navigate(`/groups/${event.group.id}/events/${event.id}`)}
      onOpenInvite={openInvite}
      onOpenProfile={() => navigate("/profile")}
      onOpenCalendar={() => navigate("/calendar")}
    />
  );
}
