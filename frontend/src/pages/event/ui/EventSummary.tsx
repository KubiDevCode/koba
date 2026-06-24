import { CalendarDays, Clock3, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import type { ArchiveEvent } from "../../../entities/archive";

type Props = {
  event: ArchiveEvent;
};

export function EventSummary({ event }: Props) {
  return (
    <section className="mx-4 mb-6 overflow-hidden rounded-lg bg-white">
      <img className="h-56 w-full object-cover" src={event.cover} alt="" />
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-3">
          <Meta icon={<CalendarDays size={15} />} label={event.date} />
          <Meta icon={<Clock3 size={15} />} label={event.time} />
        </div>
        <div className="mb-2 flex flex-wrap gap-3">
          <Meta icon={<MapPin size={15} />} label={event.location} />
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {event.description}
        </p>
      </div>
    </section>
  );
}

function Meta({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600">
      {icon}
      {label}
    </span>
  );
}
