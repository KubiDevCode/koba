import type { ArchiveEvent } from "../../../entities/archive";
import { ParticipantPreview, useArchiveUiStore } from "../../../entities/archive";
import { SectionHeading } from "../../../shared/ui/section-heading";

type Props = {
  event: ArchiveEvent;
};

export function EventParticipantsSection({ event }: Props) {
  const openParticipants = useArchiveUiStore((state) => state.openParticipants);
  const openAddUserToEvent = useArchiveUiStore(
    (state) => state.openAddUserToEvent,
  );

  return (
    <section className="px-4 pb-6">
      <SectionHeading
        eyebrow="Были на событии"
        title="Участники"
        action={
          <button
            type="button"
            className="text-xs font-extrabold text-red-600"
            onClick={() => openParticipants(event.id)}
          >
            Все {event.participants.length}
          </button>
        }
      />
      <ParticipantPreview
        participants={event.participants}
        onClick={() => openParticipants(event.id)}
        onAddClick={() => openAddUserToEvent(event.id)}
      />
    </section>
  );
}
