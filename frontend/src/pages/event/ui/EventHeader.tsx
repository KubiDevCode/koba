import { ArrowLeft, MoreHorizontal } from "lucide-react";
import type { ArchiveEvent, Group } from "../../../entities/archive";
import { IconButton } from "../../../shared/ui/icon-button";

type Props = {
  event: ArchiveEvent;
  group: Group;
  onBack: () => void;
};

export function EventHeader({ event, group, onBack }: Props) {
  return (
    <header className="flex items-center gap-3 px-4 py-4">
      <IconButton label="Назад" variant="subtle" onClick={onBack}>
        <ArrowLeft size={20} />
      </IconButton>
      <div className="min-w-0 flex-1">
        <span className="block text-[11px] font-extrabold uppercase text-slate-500">
          {group.name}
        </span>
        <h1 className="mt-1 truncate text-lg font-extrabold text-slate-950">
          {event.title}
        </h1>
      </div>
      <IconButton label="Меню" variant="subtle">
        <MoreHorizontal size={20} />
      </IconButton>
    </header>
  );
}
