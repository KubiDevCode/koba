import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { SheetModal } from "../../../shared/ui/sheet-modal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function JoinGroupModal({ open, onClose }: Props) {
  const [inviteCode, setInviteCode] = useState("");
  const [groupFound, setGroupFound] = useState(false);

  const close = () => {
    onClose();
    setGroupFound(false);
    setInviteCode("");
  };

  const title = groupFound ? "Группа найдена" : "Вступить в группу";
  const description = groupFound
    ? "Приглашение найдено. После вступления группа появится в архиве."
    : "Введите код приглашения. После проверки группа появится в вашем архиве.";

  return (
    <SheetModal
      open={open}
      title={title}
      description={description}
      icon={<Link2 size={24} />}
      onClose={close}
    >
      {groupFound ? (
        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-extrabold text-white"
          onClick={close}
        >
          <Check size={18} />
          Вступить
        </button>
      ) : (
        <>
          <input
            className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            value={inviteCode}
            onChange={(event) => setInviteCode(event.target.value.toUpperCase())}
            placeholder="Например, LETO-2026"
          />
          <button
            type="button"
            className="mt-3 flex h-11 w-full items-center justify-center rounded-lg bg-slate-900 text-sm font-extrabold text-white disabled:opacity-35"
            disabled={!inviteCode}
            onClick={() => setGroupFound(true)}
          >
            Проверить код
          </button>
        </>
      )}
    </SheetModal>
  );
}
