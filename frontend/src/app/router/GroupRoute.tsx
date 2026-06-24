import { useNavigate, useParams } from "react-router-dom";
import type { EventWithGroup, Group } from "../../entities/archive";
import { GroupPage } from "../../pages/group";
import { EmptyState } from "../ui/EmptyState";

type Props = {
  groups: Group[];
  events: EventWithGroup[];
};

export function GroupRoute({ groups, events }: Props) {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const group = groups.find((item) => String(item.id) === groupId);

  if (!group) {
    return (
      <EmptyState title="Группа не найдена" onBack={() => navigate("/groups")} />
    );
  }

  const visibleGroup = {
    ...group,
    events: events.filter((event) => String(event.group.id) === groupId),
  };

  return (
    <GroupPage
      group={visibleGroup}
      onBack={() => navigate("/groups")}
      onOpenEvent={(event) => navigate(`/groups/${group.id}/events/${event.id}`)}
    />
  );
}
