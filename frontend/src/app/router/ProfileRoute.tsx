import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArchiveUiStore } from "../../entities/archive";
import { ProfilePage } from "../../pages/profile";
import { getTelegramFirstName } from "../../shared/lib/telegram";
import { useArchiveGroups } from "../model/useArchiveSelectors";

export function ProfileRoute() {
  const navigate = useNavigate();
  const [userName] = useState(getTelegramFirstName);
  const groups = useArchiveGroups();
  const openInvite = useArchiveUiStore((state) => state.openInvite);

  return (
    <ProfilePage
      userName={userName}
      groups={groups}
      onOpenGroup={(group) => navigate(`/groups/${group.id}`)}
      onOpenInvite={openInvite}
    />
  );
}
