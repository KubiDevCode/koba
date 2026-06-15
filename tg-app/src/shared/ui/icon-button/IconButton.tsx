import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
  variant?: "default" | "subtle" | "glass";
};

const classNames = {
  default: "icon-button",
  subtle: "icon-button subtle",
  glass: "glass-button",
};

export function IconButton({
  label,
  children,
  variant = "default",
  ...buttonProps
}: Props) {
  return (
    <button
      className={classNames[variant]}
      aria-label={label}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
