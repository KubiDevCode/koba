import { Plus } from "lucide-react";
import {
  TimelineEventItem,
  type ArchiveEvent,
  type Group,
} from "../../../entities/archive";
import { IconButton } from "../../../shared/ui/icon-button";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  group: Group;
  onOpenEvent: (event: ArchiveEvent) => void;
};

export function GroupEventsSection({ group, onOpenEvent }: Props) {
  return (
    <section className="px-4 pb-6 pt-5">
      <SectionHeading
        eyebrow="Хронология"
        title="События группы"
        action={
          <IconButton label="Добавить событие">
            <Plus size={20} />
          </IconButton>
        }
      />

      <div className="grid gap-2">
        {group.events.map((event) => (
          <TimelineEventItem
            key={event.id}
            event={event}
            onClick={() => onOpenEvent(event)}
          />
        ))}
      </div>
    </section>
  );
}
