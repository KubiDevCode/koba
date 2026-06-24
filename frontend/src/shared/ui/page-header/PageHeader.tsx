import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
  home?: boolean;
};

export function PageHeader({ eyebrow, title, action, home = false }: Props) {
  return (
    <header
      className={[
        "flex items-center justify-between px-4 pb-4",
        home ? "pt-5" : "pt-4",
      ].join(" ")}
    >
      <div className="min-w-0">
        <span className="block text-[11px] font-extrabold uppercase text-slate-500">
          {eyebrow}
        </span>
        <h1 className="mt-1 truncate text-2xl font-extrabold leading-tight text-slate-950">
          {title}
        </h1>
      </div>
      {action}
    </header>
  );
}
