import { ChevronDown, Plus } from "lucide-react";
import {
  CalendarEventItem,
  type EventWithGroup,
} from "../../../entities/archive";
import { IconButton } from "../../../shared/ui/icon-button";
import { PageHeader } from "../../../shared/ui/page-header";

type Props = {
  events: EventWithGroup[];
  onOpenEvent: (event: EventWithGroup) => void;
};

export function CalendarPage({ events, onOpenEvent }: Props) {
  return (
    <>
      <PageHeader
        eyebrow="Все группы"
        title="Календарь"
        action={
          <IconButton label="Добавить событие">
            <Plus size={20} />
          </IconButton>
        }
      />

      <section className="mx-4 mb-5 flex items-center justify-between rounded-lg bg-white p-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-transparent text-sm font-extrabold text-slate-950"
        >
          <ChevronDown size={17} />
          Июнь 2026
        </button>
        <span className="text-xs text-slate-500">{events.length} события</span>
      </section>

      <section className="px-4">
        {events.map((event) => (
          <CalendarEventItem
            key={event.id}
            event={event}
            onClick={() => onOpenEvent(event)}
          />
        ))}
      </section>
    </>
  );
}
