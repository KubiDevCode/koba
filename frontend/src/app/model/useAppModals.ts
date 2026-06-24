import { useState } from "react";
import type { ArchiveEvent, Media } from "../../entities/archive";

type MediaPreview = {
  event: ArchiveEvent;
  media: Media;
};

export function useAppModals() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [participantsEvent, setParticipantsEvent] = useState<ArchiveEvent | null>(null);
  const [mediaPreview, setMediaPreview] = useState<MediaPreview | null>(null);

  return {
    inviteOpen,
    openInvite: () => setInviteOpen(true),
    closeInvite: () => setInviteOpen(false),
    participantsEvent,
    openParticipants: setParticipantsEvent,
    closeParticipants: () => setParticipantsEvent(null),
    mediaPreview,
    openMedia: (event: ArchiveEvent, media: Media) => setMediaPreview({ event, media }),
    closeMedia: () => setMediaPreview(null),
  };
}
