import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import {
  MediaGallery,
  ParticipantPreview,
  type ArchiveEvent,
  type Group,
  type Media,
} from "../../../entities/archive";
import { IconButton } from "../../../shared/ui/icon-button";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  event: ArchiveEvent;
  group: Group;
  onBack: () => void;
  onOpenMedia: (media: Media) => void;
  onOpenParticipants: () => void;
};

export function EventPage({
  event,
  group,
  onBack,
  onOpenMedia,
  onOpenParticipants,
}: Props) {
  return (
    <>
      <header className="event-header">
        <IconButton label="Назад" variant="subtle" onClick={onBack}>
          <ArrowLeft size={20} />
        </IconButton>
        <div>
          <span className="eyebrow">{group.name}</span>
          <h1>{event.title}</h1>
        </div>
        <IconButton label="Меню" variant="subtle">
          <MoreHorizontal size={20} />
        </IconButton>
      </header>

      <EventSummary event={event} />

      <section className="section-block participants-section">
        <SectionHeading
          eyebrow="Были на событии"
          title="Участники"
          action={
            <button className="text-button" onClick={onOpenParticipants}>
              Все {event.participants.length}
            </button>
          }
        />
        <ParticipantPreview
          participants={event.participants}
          onClick={onOpenParticipants}
        />
      </section>

      <section className="section-block gallery-section">
        <SectionHeading
          eyebrow="Общий архив"
          title="Фото и видео"
          action={
            <button className="add-media-button">
              <Plus size={18} />
              Добавить
            </button>
          }
        />
        <MediaGallery media={event.media} onOpenMedia={onOpenMedia} />
      </section>
    </>
  );
}

function EventSummary({ event }: { event: ArchiveEvent }) {
  return (
    <section className="event-summary">
      <img src={event.cover} alt="" />
      <div className="event-summary-copy">
        <div className="meta-row">
          <span><CalendarDays size={15} /> {event.date}</span>
          <span><Clock3 size={15} /> {event.time}</span>
        </div>
        <div className="meta-row">
          <span><MapPin size={15} /> {event.location}</span>
        </div>
        <p>{event.description}</p>
      </div>
    </section>
  );
}
