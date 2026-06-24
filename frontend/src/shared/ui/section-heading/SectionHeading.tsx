import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  action?: ReactNode;
  compact?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  action,
  compact = false,
}: Props) {
  return (
    <div
      className={[
        "mb-3 flex items-center justify-between px-1",
        compact ? "mt-1" : "",
      ].join(" ")}
    >
      <div>
        <span className="block text-[11px] font-extrabold uppercase text-slate-500">
          {eyebrow}
        </span>
        <h2 className="mt-1 text-lg font-extrabold text-slate-950">{title}</h2>
      </div>
      {action}
    </div>
  );
}
