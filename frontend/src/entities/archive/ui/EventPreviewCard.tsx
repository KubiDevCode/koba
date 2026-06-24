import { Grid2X2 } from "lucide-react";
import type { EventWithGroup } from "../model/types";

type Props = {
  event: EventWithGroup;
  onClick: () => void;
};

export function EventPreviewCard({ event, onClick }: Props) {
  return (
    <button
      type="button"
      className="relative h-40 overflow-hidden rounded-lg bg-slate-900 text-left"
      onClick={onClick}
    >
      <img className="h-full w-full object-cover" src={event.cover} alt="" />
      <span className="absolute left-2 top-2 rounded-md bg-white px-2 py-1 text-[9px] font-extrabold text-slate-900">
        {event.shortDate}
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent p-3 pt-10 text-white">
        <strong className="block truncate text-sm font-extrabold">
          {event.title}
        </strong>
        <span className="mt-1 flex items-center gap-1 text-[10px] text-slate-200">
          {event.group.name} · <Grid2X2 size={10} /> {event.media.length}
        </span>
      </span>
    </button>
  );
}
