import type { ArchiveEvent } from "../entities/archive";
import { useAcceptEventInvite } from "../features/accept-event-invite";
import { JoinGroupModal } from "../features/join-group";
import { MediaViewer } from "../features/view-media";
import { ParticipantsModal } from "../features/view-participants";
import { BottomNavigation } from "../widgets/bottom-navigation";
import { useAppData } from "./model/useAppData";
import { useAppModals } from "./model/useAppModals";
import { AppRouter } from "./router/AppRouter";
import { DataStatus } from "./ui/DataStatus";

export function AppShell() {
  const { userId, userName, groups, eventsWithGroup, loading, error, reloadGroups } =
    useAppData();
  const modals = useAppModals();

  useAcceptEventInvite(reloadGroups);

  return (
    <div className="min-h-screen bg-slate-200">
      <main className="mx-auto min-h-screen w-full max-w-[680px] bg-slate-100 pb-24 shadow-slate-900/10 sm:shadow-2xl">
        <DataStatus loading={loading} error={error} userId={userId} />
        <AppRouter
          userName={userName}
          groups={groups}
          events={eventsWithGroup}
          onOpenInvite={modals.openInvite}
          onOpenMedia={modals.openMedia}
          onOpenParticipants={modals.openParticipants}
        />
      </main>

      <BottomNavigation />

      <JoinGroupModal open={modals.inviteOpen} onClose={modals.closeInvite} />

      {modals.participantsEvent && (
        <ParticipantsModal
          event={modals.participantsEvent}
          open
          onClose={modals.closeParticipants}
        />
      )}

      <MediaViewer
        event={modals.mediaPreview?.event ?? emptyEvent}
        media={modals.mediaPreview?.media ?? null}
        onClose={modals.closeMedia}
      />
    </div>
  );
}

const emptyEvent: ArchiveEvent = {
  id: 0,
  groupId: 0,
  title: "",
  date: "",
  shortDate: "",
  time: "",
  location: "",
  description: "",
  cover: "",
  media: [],
  participants: [],
};
