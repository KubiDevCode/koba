import { ArrowLeft, MoreHorizontal, Plus, ShieldCheck } from "lucide-react";
import {
  TimelineEventItem,
  type ArchiveEvent,
  type Group,
} from "../../../entities/archive";
import { IconButton } from "../../../shared/ui/icon-button";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  group: Group;
  onBack: () => void;
  onOpenEvent: (event: ArchiveEvent) => void;
};

export function GroupPage({ group, onBack, onOpenEvent }: Props) {
  return (
    <>
      <header
        className="media-hero"
        style={{ backgroundImage: `url(${group.cover})` }}
      >
        <div className="hero-actions">
          <IconButton label="Назад" variant="glass" onClick={onBack}>
            <ArrowLeft size={20} />
          </IconButton>
          <IconButton label="Меню" variant="glass">
            <MoreHorizontal size={20} />
          </IconButton>
        </div>

        <div className="hero-copy">
          <span className="access-pill">
            <ShieldCheck size={14} />
            {group.role}
          </span>
          <h1>{group.name}</h1>
          <p>{group.members} участников · {group.events.length} события</p>
        </div>
      </header>

      <section className="section-block first-after-hero">
        <SectionHeading
          eyebrow="Хронология"
          title="События группы"
          action={
            <IconButton label="Добавить событие">
              <Plus size={20} />
            </IconButton>
          }
        />

        <div className="timeline">
          {group.events.map((event) => (
            <TimelineEventItem
              key={event.id}
              event={event}
              onClick={() => onOpenEvent(event)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
