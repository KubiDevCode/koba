import { Grid2X2, MapPin } from "lucide-react";
import type { ArchiveEvent } from "../model/types";

type Props = {
  event: ArchiveEvent;
  onClick: () => void;
};

export function TimelineEventItem({ event, onClick }: Props) {
  const [day, month] = event.shortDate.split(" ");

  return (
    <button
      type="button"
      className="grid min-h-18 w-full grid-cols-[45px_82px_1fr] items-center gap-2 rounded-lg bg-white p-2 text-left"
      onClick={onClick}
    >
      <span className="grid h-14 place-items-center border-r border-slate-100">
        <strong className="text-xl font-extrabold text-slate-950">{day}</strong>
        <span className="-mt-2 text-[9px] uppercase text-slate-500">
          {month}
        </span>
      </span>
      <img className="h-14 w-20 rounded-md object-cover" src={event.cover} alt="" />
      <span className="grid min-w-0 gap-1">
        <strong className="truncate text-xs font-extrabold text-slate-950">
          {event.title}
        </strong>
        <span className="flex items-center gap-1 text-[10px] text-slate-500">
          <MapPin size={13} /> {event.location}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-500">
          <Grid2X2 size={13} /> {event.media.length} медиа
        </span>
      </span>
    </button>
  );
}
