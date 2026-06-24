import { useNavigate } from "react-router-dom";
import type { EventWithGroup, Group } from "../../entities/archive";
import { GroupsPage } from "../../pages/groups";

type Props = {
  userName: string;
  groups: Group[];
  events: EventWithGroup[];
  onOpenInvite: () => void;
};

export function GroupsRoute({ userName, groups, events, onOpenInvite }: Props) {
  const navigate = useNavigate();

  return (
    <GroupsPage
      userName={userName}
      groups={groups}
      events={events}
      onOpenGroup={(group) => navigate(`/groups/${group.id}`)}
      onOpenEvent={(event) => navigate(`/groups/${event.group.id}/events/${event.id}`)}
      onOpenInvite={onOpenInvite}
      onOpenProfile={() => navigate("/profile")}
      onOpenCalendar={() => navigate("/calendar")}
    />
  );
}
