import { Link2, ShieldCheck, UsersRound } from "lucide-react";
import type { Group } from "../model/types";

type Props = {
  group: Group;
  onClick: () => void;
};

export function GroupListItem({ group, onClick }: Props) {
  const RoleIcon = group.role === "Участник" ? ShieldCheck : Link2;

  return (
    <button
      type="button"
      className="flex min-h-17 w-full items-center rounded-lg bg-white p-2 text-left"
      onClick={onClick}
    >
      <img
        className="h-12 w-12 rounded-md object-cover"
        src={group.avatar}
        alt=""
      />
      <span className="ml-3 grid min-w-0 gap-1">
        <strong className="truncate text-sm font-extrabold text-slate-950">
          {group.name}
        </strong>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
          <UsersRound size={14} />
          {group.members} участников
        </span>
      </span>
      <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[9px] font-extrabold text-slate-600">
        <RoleIcon size={13} />
        {group.role}
      </span>
    </button>
  );
}
