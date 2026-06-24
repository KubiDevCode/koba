import { useEffect } from "react";
import { getTelegramStartParam } from "../../../shared/lib/telegram";
import { acceptEventInvite } from "../api/acceptEventInvite";

const handledStartParams = new Set<string>();

function getEventIdFromStartParam(startParam: string) {
  if (!startParam.startsWith("event_")) {
    return null;
  }

  return startParam.slice("event_".length) || null;
}

export function useAcceptEventInvite(onAccepted?: () => void | Promise<void>) {
  useEffect(() => {
    const startParam = getTelegramStartParam();

    if (!startParam || handledStartParams.has(startParam)) {
      return;
    }

    const eventId = getEventIdFromStartParam(startParam);

    if (!eventId) {
      return;
    }

    handledStartParams.add(startParam);

    void acceptEventInvite(eventId)
      .then(() => onAccepted?.())
      .catch(() => {
        handledStartParams.delete(startParam);
      });
  }, [onAccepted]);
}
