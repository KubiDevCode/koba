import { ArrowLeft, MoreHorizontal, ShieldCheck } from "lucide-react";
import type { Group } from "../../../entities/archive";
import { IconButton } from "../../../shared/ui/icon-button";

type Props = {
  group: Group;
  onBack: () => void;
};

export function GroupHero({ group, onBack }: Props) {
  return (
    <header
      className="relative h-80 bg-cover bg-center p-4 text-white"
      style={{ backgroundImage: `url(${group.cover})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/90" />
      <div className="relative z-10 flex justify-between">
        <IconButton label="Назад" variant="glass" onClick={onBack}>
          <ArrowLeft size={20} />
        </IconButton>
        <IconButton label="Меню" variant="glass">
          <MoreHorizontal size={20} />
        </IconButton>
      </div>

      <div className="absolute inset-x-4 bottom-6 z-10">
        <span className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-[10px] font-extrabold">
          <ShieldCheck size={14} />
          {group.role}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight">
          {group.name}
        </h1>
        <p className="mt-1 text-xs text-slate-200">
          {group.members} участников · {group.events.length} события
        </p>
      </div>
    </header>
  );
}
