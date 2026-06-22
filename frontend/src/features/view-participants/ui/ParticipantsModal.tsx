import { Check, UsersRound } from "lucide-react";
import type { ArchiveEvent } from "../../../entities/archive";
import { SheetModal } from "../../../shared/ui/sheet-modal";

type Props = {
  event: ArchiveEvent;
  open: boolean;
  onClose: () => void;
};

export function ParticipantsModal({ event, open, onClose }: Props) {
  return (
    <SheetModal
      open={open}
      title="Участники события"
      description={`${event.title} · ${event.participants.length} человек`}
      icon={<UsersRound size={24} />}
      onClose={onClose}
      scrollable
    >
      <div className="participant-list">
        {event.participants.map((participant) => (
          <div key={participant.id}>
            <img src={participant.avatar} alt="" />
            <strong>{participant.name}</strong>
            <span><Check size={14} /></span>
          </div>
        ))}
      </div>
    </SheetModal>
  );
}
