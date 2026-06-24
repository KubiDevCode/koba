import { Plus, UsersRound } from "lucide-react";
import type { Participant } from "../model/types";

type Props = {
  participants: Participant[];
  onClick: () => void;
  onAddClick?: () => void;
};

export function ParticipantPreview({
  participants,
  onClick,
  onAddClick,
}: Props) {
  const names = participants
    .slice(0, 3)
    .map((participant) => participant.name)
    .join(", ");

  return (
    <div className="flex min-h-16 w-full items-center rounded-lg bg-white px-3 py-2 text-left">
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center bg-transparent p-0 text-left"
        onClick={onClick}
      >
        <span className="flex min-w-[106px]">
          {participants.slice(0, 4).map((participant) => (
            <img
              className="-mr-4 h-9 w-9 rounded-full border-2 border-white object-cover"
              key={participant.id}
              src={participant.avatar}
              alt={participant.name}
            />
          ))}
        </span>
        <span className="ml-3 grid min-w-0 gap-1">
          <strong className="block max-w-36 truncate text-xs font-extrabold text-slate-950">
            {names || "Нет участников"}
          </strong>
          <small className="text-[10px] text-slate-500">
            и еще {Math.max(participants.length - 3, 0)} участников
          </small>
        </span>
      </button>
      <button
        type="button"
        aria-label="Добавить участника"
        onClick={onAddClick ?? onClick}
        className="ml-auto grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-red-600"
      >
        <Plus size={16} />
      </button>
      <UsersRound className="ml-2 shrink-0 text-slate-400" size={19} />
    </div>
  );
}
