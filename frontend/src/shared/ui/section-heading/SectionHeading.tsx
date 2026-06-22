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
    <div className={`section-heading${compact ? " compact" : ""}`}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}
