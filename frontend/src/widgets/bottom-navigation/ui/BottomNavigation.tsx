import { CalendarDays, UserRound, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

export type MainView = "groups" | "calendar" | "profile";

type Props = {
  activeView: MainView;
  onNavigate: (view: MainView) => void;
};

export function BottomNavigation({ activeView, onNavigate }: Props) {
  return (
    <nav className="bottom-nav">
      <NavigationItem
        active={activeView === "groups"}
        icon={<UsersRound size={21} />}
        label="Группы"
        onClick={() => onNavigate("groups")}
      />
      <NavigationItem
        active={activeView === "calendar"}
        icon={<CalendarDays size={21} />}
        label="События"
        onClick={() => onNavigate("calendar")}
      />
      <NavigationItem
        active={activeView === "profile"}
        icon={<UserRound size={21} />}
        label="Профиль"
        onClick={() => onNavigate("profile")}
      />
    </nav>
  );
}

type NavigationItemProps = {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

function NavigationItem({
  active,
  icon,
  label,
  onClick,
}: NavigationItemProps) {
  return (
    <button className={active ? "active" : ""} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
