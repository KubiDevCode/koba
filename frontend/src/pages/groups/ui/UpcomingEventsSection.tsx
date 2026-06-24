import { EventPreviewCard, type EventWithGroup } from "../../../entities/archive";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  events: EventWithGroup[];
  onOpenCalendar: () => void;
  onOpenEvent: (event: EventWithGroup) => void;
};

export function UpcomingEventsSection({
  events,
  onOpenCalendar,
  onOpenEvent,
}: Props) {
  return (
    <section className="px-4 pb-6">
      <SectionHeading
        compact
        eyebrow="Скоро"
        title="Ближайшие события"
        action={
          <button
            type="button"
            className="text-xs font-extrabold text-red-600"
            onClick={onOpenCalendar}
          >
            Все
          </button>
        }
      />
      <div className="grid auto-cols-[minmax(190px,62%)] grid-flow-col gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {events.slice(0, 3).map((event) => (
          <EventPreviewCard
            key={event.id}
            event={event}
            onClick={() => onOpenEvent(event)}
          />
        ))}
      </div>
    </section>
  );
}
