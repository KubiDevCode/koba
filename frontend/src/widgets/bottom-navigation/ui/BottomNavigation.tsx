import { CalendarDays, UserRound, UsersRound } from "lucide-react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const mainRoutes = ["/groups", "/calendar", "/profile"];

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!mainRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto flex h-18 max-w-[680px] justify-around border-t border-slate-200 bg-white pt-2">
      <NavigationItem
        active={location.pathname === "/groups"}
        icon={<UsersRound size={21} />}
        label="Группы"
        onClick={() => navigate("/groups")}
      />
      <NavigationItem
        active={location.pathname === "/calendar"}
        icon={<CalendarDays size={21} />}
        label="События"
        onClick={() => navigate("/calendar")}
      />
      <NavigationItem
        active={location.pathname === "/profile"}
        icon={<UserRound size={21} />}
        label="Профиль"
        onClick={() => navigate("/profile")}
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
    <button
      type="button"
      className={[
        "grid min-w-14 place-items-center content-center gap-1 bg-transparent text-[10px] font-extrabold",
        active ? "text-red-600" : "text-slate-400",
      ].join(" ")}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
