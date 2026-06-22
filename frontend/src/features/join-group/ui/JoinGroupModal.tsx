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
    ? "Вас пригласили в закрытый архив «Лето на даче»."
    : "Введите код из приглашения. После проверки группа появится в вашем архиве.";

  return (
    <SheetModal
      open={open}
      title={title}
      description={description}
      icon={<Link2 size={24} />}
      onClose={close}
    >
      {groupFound ? (
        <button className="primary-button" onClick={close}>
          <Check size={18} />
          Вступить
        </button>
      ) : (
        <>
          <input
            value={inviteCode}
            onChange={(event) => setInviteCode(event.target.value.toUpperCase())}
            placeholder="Например, LETO-2026"
          />
          <button
            className="primary-button"
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
