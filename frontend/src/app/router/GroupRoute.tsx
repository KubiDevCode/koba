import { useNavigate, useParams } from "react-router-dom";
import { GroupPage } from "../../pages/group";
import { useArchiveGroup } from "../model/useArchiveSelectors";
import { EmptyState } from "../ui/EmptyState";

export function GroupRoute() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const group = useArchiveGroup(groupId);

  if (!group) {
    return (
      <EmptyState title="Группа не найдена" onBack={() => navigate("/groups")} />
    );
  }

  return (
    <GroupPage
      group={group}
      onBack={() => navigate("/groups")}
      onOpenEvent={(event) => navigate(`/groups/${group.id}/events/${event.id}`)}
    />
  );
}
