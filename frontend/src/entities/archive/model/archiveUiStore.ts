import { create } from "zustand";

type MediaPreviewState = {
  eventId: string;
  mediaId: string;
};

type ArchiveUiStoreState = {
  inviteOpen: boolean;
  participantsEventId: string | null;
  addUserEventId: string | null;
  mediaPreview: MediaPreviewState | null;
  openInvite: () => void;
  closeInvite: () => void;
  openParticipants: (eventId: string) => void;
  closeParticipants: () => void;
  openAddUserToEvent: (eventId: string) => void;
  closeAddUserToEvent: () => void;
  openMedia: (eventId: string, mediaId: string) => void;
  closeMedia: () => void;
};

export const useArchiveUiStore = create<ArchiveUiStoreState>((set) => ({
  inviteOpen: false,
  participantsEventId: null,
  addUserEventId: null,
  mediaPreview: null,
  openInvite: () => set({ inviteOpen: true }),
  closeInvite: () => set({ inviteOpen: false }),
  openParticipants: (eventId) => set({ participantsEventId: eventId }),
  closeParticipants: () => set({ participantsEventId: null }),
  openAddUserToEvent: (eventId) => set({ addUserEventId: eventId }),
  closeAddUserToEvent: () => set({ addUserEventId: null }),
  openMedia: (eventId, mediaId) => set({ mediaPreview: { eventId, mediaId } }),
  closeMedia: () => set({ mediaPreview: null }),
}));
