import { LockKeyhole } from "lucide-react";
import type { Group } from "../model/types";

type Props = {
  group: Group;
  onClick: () => void;
};

export function GroupAccessItem({ group, onClick }: Props) {
  return (
    <button
      type="button"
      className="flex min-h-14 w-full items-center gap-3 rounded-lg bg-white p-2 text-left"
      onClick={onClick}
    >
      <img
        className="h-11 w-11 rounded-md object-cover"
        src={group.avatar}
        alt=""
      />
      <span className="grid min-w-0 gap-1">
        <strong className="truncate text-sm font-extrabold text-slate-950">
          {group.name}
        </strong>
        <small className="text-xs text-slate-500">{group.role}</small>
      </span>
      <LockKeyhole className="ml-auto text-slate-400" size={17} />
    </button>
  );
}
