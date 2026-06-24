import { useNavigate } from "react-router-dom";
import type { Group } from "../../entities/archive";
import { ProfilePage } from "../../pages/profile";

type Props = {
  userName: string;
  groups: Group[];
  onOpenInvite: () => void;
};

export function ProfileRoute({ userName, groups, onOpenInvite }: Props) {
  const navigate = useNavigate();

  return (
    <ProfilePage
      userName={userName}
      groups={groups}
      onOpenGroup={(group) => navigate(`/groups/${group.id}`)}
      onOpenInvite={onOpenInvite}
    />
  );
}
