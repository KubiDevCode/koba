import type { ArchiveEvent, Group } from "../../../entities/archive";
import { EventHeader } from "./EventHeader";
import { EventMediaSection } from "./EventMediaSection";
import { EventParticipantsSection } from "./EventParticipantsSection";
import { EventSummary } from "./EventSummary";

type Props = {
  event: ArchiveEvent;
  group: Group;
  onBack: () => void;
};

export function EventPage({
  event,
  group,
  onBack,
}: Props) {
  return (
    <>
      <EventHeader event={event} group={group} onBack={onBack} />
      <EventSummary event={event} />
      <EventParticipantsSection event={event} />
      <EventMediaSection event={event} />
    </>
  );
}
