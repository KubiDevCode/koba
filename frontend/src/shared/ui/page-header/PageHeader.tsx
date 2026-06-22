import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
  home?: boolean;
};

export function PageHeader({ eyebrow, title, action, home = false }: Props) {
  return (
    <header className={`topbar${home ? " home-topbar" : ""}`}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
      </div>
      {action}
    </header>
  );
}
