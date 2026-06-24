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
      <div className="grid gap-2">
        {event.participants.map((participant) => (
          <div
            className="flex min-h-13 items-center gap-3 rounded-lg bg-slate-100 p-2"
            key={participant.id}
          >
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={participant.avatar}
              alt=""
            />
            <strong className="text-sm font-extrabold text-slate-950">
              {participant.name}
            </strong>
            <span className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-emerald-600 text-white">
              <Check size={14} />
            </span>
          </div>
        ))}
      </div>
    </SheetModal>
  );
}
