import type { ReactNode } from "react";
import { X } from "lucide-react";

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
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className={`invite-sheet${scrollable ? " participants-sheet" : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="close-button" onClick={onClose} aria-label="Закрыть">
          <X size={20} />
        </button>
        <span className="sheet-icon">{icon}</span>
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
      </section>
    </div>
  );
}
