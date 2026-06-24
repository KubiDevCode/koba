import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
  variant?: "default" | "subtle" | "glass";
};

const classNames = {
  default:
    "grid h-10 w-10 place-items-center rounded-lg bg-white text-slate-800 shadow-sm shadow-slate-900/10",
  subtle:
    "grid h-10 w-10 place-items-center rounded-lg bg-slate-200 text-slate-800",
  glass:
    "grid h-10 w-10 place-items-center rounded-lg bg-slate-950/60 text-white backdrop-blur",
};

export function IconButton({
  label,
  children,
  variant = "default",
  className,
  ...buttonProps
}: Props) {
  return (
    <button
      type="button"
      className={[classNames[variant], className].filter(Boolean).join(" ")}
      aria-label={label}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
