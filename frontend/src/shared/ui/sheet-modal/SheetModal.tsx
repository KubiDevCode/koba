import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  description: ReactNode;
  icon: ReactNode;
  children: ReactNode;
  onClose: () => void;
  scrollable?: boolean;
};

export function SheetModal({
  open,
  title,
  description,
  icon,
  children,
  onClose,
  scrollable = false,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-30">
      <div className="fixed inset-0 bg-slate-950/65" aria-hidden="true" />
      <div className="fixed inset-0 flex items-end justify-center p-3">
        <DialogPanel
          className={[
            "relative w-full max-w-125 rounded-lg bg-white p-5 shadow-xl",
            scrollable ? "max-h-[76vh] overflow-y-auto" : "",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-md bg-slate-100 text-slate-700"
          >
            <X size={20} />
          </button>

          <span className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-red-50 text-red-600">
            {icon}
          </span>
          <DialogTitle className="mb-2 pr-10 text-xl font-extrabold text-slate-950">
            {title}
          </DialogTitle>
          <p className="mb-5 text-sm leading-6 text-slate-500">{description}</p>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
