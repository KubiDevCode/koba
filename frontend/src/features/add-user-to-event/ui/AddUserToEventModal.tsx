import { useMemo, useState } from "react";
import { Check, Copy, Link2 } from "lucide-react";
import { SheetModal } from "../../../shared/ui/sheet-modal";
import { inviteGenerateUrl } from "../model/inviteGenerateUrl";

type Props = {
    open: boolean;
    onClose: () => void;
    eventId: string;
};

export function AddUserToEventModal({ open, onClose, eventId }: Props) {
    const [copied, setCopied] = useState(false);
    const inviteUrl = useMemo(() => inviteGenerateUrl(eventId), [eventId]);

    const close = () => {
        onClose();
        setCopied(false);
    };

    const copyInvite = async () => {
        await navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
    };

    return (
        <SheetModal
            open={open}
            title="Пригласить участника"
            description="Отправьте эту ссылку человеку. После открытия через Telegram он добавится к событию."
            icon={<Link2 size={24} />}
            onClose={close}
        >
            <div className="rounded-lg bg-slate-100 p-3 text-xs leading-5 text-slate-700 break-all">
                {inviteUrl}
            </div>
            <button
                type="button"
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-extrabold text-white"
                onClick={copyInvite}
            >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Скопировано" : "Скопировать ссылку"}
            </button>
        </SheetModal>
    );
}
