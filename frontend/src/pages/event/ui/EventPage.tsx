import type { ArchiveEvent, Group, Media } from "../../../entities/archive";
import { EventHeader } from "./EventHeader";
import { EventMediaSection } from "./EventMediaSection";
import { EventParticipantsSection } from "./EventParticipantsSection";
import { EventSummary } from "./EventSummary";

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
      <EventHeader event={event} group={group} onBack={onBack} />
      <EventSummary event={event} />
      <EventParticipantsSection
        event={event}
        onOpenParticipants={onOpenParticipants}
      />
      <EventMediaSection event={event} onOpenMedia={onOpenMedia} />
    </>
  );
}
