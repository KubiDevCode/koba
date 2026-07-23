import { Navigate, Route, Routes } from "react-router-dom";
import { CalendarRoute } from "./CalendarRoute";
import { EventRoute } from "./EventRoute";
import { GroupRoute } from "./GroupRoute";
import { GroupsRoute } from "./GroupsRoute";
import { ProfileRoute } from "./ProfileRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/groups" replace />} />
      <Route path="/groups" element={<GroupsRoute />} />
      <Route path="/groups/:groupId" element={<GroupRoute />} />
      <Route
        path="/groups/:groupId/events/:eventId"
        element={<EventRoute />}
      />
      <Route path="/calendar" element={<CalendarRoute />} />
      <Route path="/profile" element={<ProfileRoute />} />
      <Route path="*" element={<Navigate to="/groups" replace />} />
    </Routes>
  );
}
