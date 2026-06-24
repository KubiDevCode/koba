import { Navigate, Route, Routes } from "react-router-dom";
import type {
  ArchiveEvent,
  EventWithGroup,
  Group,
  Media,
} from "../../entities/archive";
import { CalendarRoute } from "./CalendarRoute";
import { EventRoute } from "./EventRoute";
import { GroupRoute } from "./GroupRoute";
import { GroupsRoute } from "./GroupsRoute";
import { ProfileRoute } from "./ProfileRoute";

type Props = {
  userName: string;
  groups: Group[];
  events: EventWithGroup[];
  onOpenInvite: () => void;
  onOpenMedia: (event: ArchiveEvent, media: Media) => void;
  onOpenParticipants: (event: ArchiveEvent) => void;
};

export function AppRouter({
  userName,
  groups,
  events,
  onOpenInvite,
  onOpenMedia,
  onOpenParticipants,
}: Props) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/groups" replace />} />
      <Route
        path="/groups"
        element={
          <GroupsRoute
            userName={userName}
            groups={groups}
            events={events}
            onOpenInvite={onOpenInvite}
          />
        }
      />
      <Route path="/groups/:groupId" element={<GroupRoute groups={groups} events={events} />} />
      <Route
        path="/groups/:groupId/events/:eventId"
        element={
          <EventRoute
            groups={groups}
            events={events}
            onOpenMedia={onOpenMedia}
            onOpenParticipants={onOpenParticipants}
          />
        }
      />
      <Route path="/calendar" element={<CalendarRoute events={events} />} />
      <Route
        path="/profile"
        element={
          <ProfileRoute
            userName={userName}
            groups={groups}
            onOpenInvite={onOpenInvite}
          />
        }
      />
      <Route path="*" element={<Navigate to="/groups" replace />} />
    </Routes>
  );
}
