import { Link2, ShieldCheck, UsersRound } from "lucide-react";
import type { Group } from "../model/types";

type Props = {
  group: Group;
  onClick: () => void;
};

export function GroupListItem({ group, onClick }: Props) {
  const RoleIcon = group.role === "Участник" ? ShieldCheck : Link2;

  return (
    <button className="group-row" onClick={onClick}>
      <img src={group.avatar} alt="" />
      <span className="group-row-main">
        <strong>{group.name}</strong>
        <span>
          <UsersRound size={14} />
          {group.members} участников
        </span>
      </span>
      <span className="role-label">
        <RoleIcon size={13} />
        {group.role}
      </span>
    </button>
  );
}
