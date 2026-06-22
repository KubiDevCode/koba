import { UsersRound } from "lucide-react";
import type { Participant } from "../model/types";

type Props = {
  participants: Participant[];
  onClick: () => void;
};

export function ParticipantPreview({ participants, onClick }: Props) {
  const names = participants
    .slice(0, 3)
    .map((participant) => participant.name)
    .join(", ");

  return (
    <button className="participant-preview" onClick={onClick}>
      <span className="avatar-stack">
        {participants.slice(0, 6).map((participant) => (
          <img
            key={participant.id}
            src={participant.avatar}
            alt={participant.name}
          />
        ))}
      </span>
      <span className="participant-preview-copy">
        <strong>{names}</strong>
        <small>и ещё {Math.max(participants.length - 3, 0)} участников</small>
      </span>
      <UsersRound size={19} />
    </button>
  );
}
