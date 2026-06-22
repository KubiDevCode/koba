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

      <section className="month-picker">
        <button>
          <ChevronDown size={17} />
          Июнь 2026
        </button>
        <span>{events.length} события</span>
      </section>

      <section className="calendar-list">
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
