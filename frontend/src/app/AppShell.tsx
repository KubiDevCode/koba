import { AddUserToEventModal } from "../features/add-user-to-event";
import { useAcceptEventInvite } from "../features/accept-event-invite";
import { JoinGroupModal } from "../features/join-group";
import { MediaViewer } from "../features/view-media";
import { ParticipantsModal } from "../features/view-participants";
import { BottomNavigation } from "../widgets/bottom-navigation";
import { useArchiveEvent } from "./model/useArchiveSelectors";
import { useAppData } from "./model/useAppData";
import { useAppModals } from "./model/useAppModals";
import { AppRouter } from "./router/AppRouter";
import { DataStatus } from "./ui/DataStatus";

export function AppShell() {
  const { userId, loading, error, reloadGroups } = useAppData();
  const modals = useAppModals();
  const participantsEvent = useArchiveEvent(modals.participantsEventId);
  const mediaEvent = useArchiveEvent(modals.mediaPreview?.eventId);
  const media =
    mediaEvent?.media.find((item) => item.id === modals.mediaPreview?.mediaId) ??
    null;

  useAcceptEventInvite(reloadGroups);

  return (
    <div className="min-h-screen bg-slate-200">
      <main className="mx-auto min-h-screen w-full max-w-170 bg-slate-100 pb-24 shadow-slate-900/10 sm:shadow-2xl">
        <DataStatus loading={loading} error={error} userId={userId} />
        <AppRouter />
      </main>

      <BottomNavigation />

      <JoinGroupModal open={modals.inviteOpen} onClose={modals.closeInvite} />

      {participantsEvent && (
        <ParticipantsModal
          event={participantsEvent}
          open
          onClose={modals.closeParticipants}
        />
      )}

      {modals.addUserEventId && (
        <AddUserToEventModal
          eventId={modals.addUserEventId}
          open
          onClose={modals.closeAddUserToEvent}
        />
      )}

      <MediaViewer
        event={mediaEvent}
        media={media}
        onClose={modals.closeMedia}
      />
    </div>
  );
}
