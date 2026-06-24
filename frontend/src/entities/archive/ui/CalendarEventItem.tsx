import type { EventWithGroup } from "../model/types";

type Props = {
  event: EventWithGroup;
  onClick: () => void;
};

export function CalendarEventItem({ event, onClick }: Props) {
  const [day, month] = event.shortDate.split(" ");

  return (
    <button
      type="button"
      className="relative grid min-h-20 w-full grid-cols-[42px_78px_1fr] items-center gap-3 py-2 text-left"
      onClick={onClick}
    >
      <span className="absolute bottom-0 left-5 top-0 w-px bg-slate-300" />
      <span className="z-10 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white">
        <strong className="text-sm font-extrabold text-slate-950">{day}</strong>
        <span className="-mt-2 text-[8px] uppercase text-slate-500">
          {month}
        </span>
      </span>
      <img className="h-16 w-20 rounded-md object-cover" src={event.cover} alt="" />
      <span className="grid min-w-0 gap-1">
        <span className="text-[9px] font-extrabold uppercase text-red-600">
          {event.group.name}
        </span>
        <strong className="truncate text-xs font-extrabold text-slate-950">
          {event.title}
        </strong>
        <small className="text-[9px] text-slate-500">
          {event.time} · {event.location}
        </small>
      </span>
    </button>
  );
}
