import { useEffect, useMemo, useState } from "react";
import {
  groups,
  type ArchiveEvent,
  type EventWithGroup,
  type Group,
  type Media,
} from "../entities/archive";
import { JoinGroupModal } from "../features/join-group";
import { MediaViewer } from "../features/view-media";
import { ParticipantsModal } from "../features/view-participants";
import { CalendarPage } from "../pages/calendar";
import { EventPage } from "../pages/event";
import { GroupPage } from "../pages/group";
import { GroupsPage } from "../pages/groups";
import { ProfilePage } from "../pages/profile";
import {
  getTelegramFirstName,
  initializeTelegramApp,
} from "../shared/lib/telegram";
import {
  BottomNavigation,
  type MainView,
} from "../widgets/bottom-navigation";
import "./styles/index.css";

type View = MainView | "group" | "event";

export function App() {
  const [view, setView] = useState<View>("groups");
  const [activeGroup, setActiveGroup] = useState(groups[0]);
  const [activeEvent, setActiveEvent] = useState(groups[0].events[0]);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [userName] = useState(getTelegramFirstName);

  useEffect(initializeTelegramApp, []);

  const events = useMemo<EventWithGroup[]>(
    () =>
      groups.flatMap((group) =>
        group.events.map((event) => ({ ...event, group })),
      ),
    [],
  );

  const openGroup = (group: Group) => {
    setActiveGroup(group);
    setView("group");
  };

  const openEvent = (event: ArchiveEvent, group = activeGroup) => {
    setActiveGroup(group);
    setActiveEvent(event);
    setView("event");
  };

  const openEventWithGroup = (event: EventWithGroup) => {
    openEvent(event, event.group);
  };

  const mainViewVisible =
    view === "groups" || view === "calendar" || view === "profile";

  return (
    <div className="app-shell">
      <main className="app-content">
        {view === "groups" && (
          <GroupsPage
            userName={userName}
            groups={groups}
            events={events}
            onOpenGroup={openGroup}
            onOpenEvent={openEventWithGroup}
            onOpenInvite={() => setInviteOpen(true)}
            onOpenProfile={() => setView("profile")}
            onOpenCalendar={() => setView("calendar")}
          />
        )}
        {view === "group" && (
          <GroupPage
            group={activeGroup}
            onBack={() => setView("groups")}
            onOpenEvent={openEvent}
          />
        )}
        {view === "event" && (
          <EventPage
            event={activeEvent}
            group={activeGroup}
            onBack={() => setView("group")}
            onOpenMedia={setSelectedMedia}
            onOpenParticipants={() => setParticipantsOpen(true)}
          />
        )}
        {view === "calendar" && (
          <CalendarPage events={events} onOpenEvent={openEventWithGroup} />
        )}
        {view === "profile" && (
          <ProfilePage
            userName={userName}
            groups={groups}
            onOpenGroup={openGroup}
            onOpenInvite={() => setInviteOpen(true)}
          />
        )}
      </main>

      {mainViewVisible && (
        <BottomNavigation activeView={view} onNavigate={setView} />
      )}

      <JoinGroupModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
      <ParticipantsModal
        event={activeEvent}
        open={participantsOpen}
        onClose={() => setParticipantsOpen(false)}
      />
      <MediaViewer
        event={activeEvent}
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </div>
  );
}
