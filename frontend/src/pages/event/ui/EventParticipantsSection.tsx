import type { ArchiveEvent } from "../../../entities/archive";
import { ParticipantPreview } from "../../../entities/archive";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  event: ArchiveEvent;
  onOpenParticipants: () => void;
};

export function EventParticipantsSection({ event, onOpenParticipants }: Props) {
  return (
    <section className="px-4 pb-6">
      <SectionHeading
        eyebrow="Были на событии"
        title="Участники"
        action={
          <button
            type="button"
            className="text-xs font-extrabold text-red-600"
            onClick={onOpenParticipants}
          >
            Все {event.participants.length}
          </button>
        }
      />
      <ParticipantPreview
        participants={event.participants}
        onClick={onOpenParticipants}
      />
    </section>
  );
}
