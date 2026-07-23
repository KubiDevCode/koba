import { useMemo } from "react";
import type { ArchiveEvent, EventWithGroup, Group } from "../../entities/archive";
import { useGroupStore } from "../../pages/group/model/groupStore";

function attachGroup(event: ArchiveEvent, groups: Group[]): EventWithGroup | null {
  const group = groups.find((item) => item.id === event.groupId);

  if (!group) {
    return null;
  }

  return {
    ...event,
    group,
  };
}

export function useArchiveGroups() {
  return useGroupStore((state) => state.groups);
}

export function useArchiveEvents() {
  const groups = useGroupStore((state) => state.groups);

  return useMemo(
    () => groups.flatMap((group) => group.events),
    [groups],
  );
}

export function useArchiveEventsWithGroups() {
  const groups = useArchiveGroups();
  const events = useArchiveEvents();

  return useMemo(
    () =>
      events.flatMap((event) => {
        const eventWithGroup = attachGroup(event, groups);
        return eventWithGroup ? [eventWithGroup] : [];
      }),
    [events, groups],
  );
}

export function useArchiveGroup(groupId: string | undefined) {
  const groups = useArchiveGroups();
  const events = useArchiveEventsWithGroups();

  return useMemo(() => {
    const group = groups.find((item) => String(item.id) === groupId);

    if (!group) {
      return null;
    }

    return {
      ...group,
      events: events.filter((event) => String(event.group.id) === groupId),
    };
  }, [events, groupId, groups]);
}

export function useArchiveEvent(eventId: string | null | undefined) {
  const events = useArchiveEvents();

  return useMemo(
    () => events.find((event) => event.id === eventId) ?? null,
    [eventId, events],
  );
}

export function useArchiveEventWithGroup(
  groupId: string | undefined,
  eventId: string | undefined,
) {
  const events = useArchiveEventsWithGroups();

  return useMemo(
    () =>
      events.find(
        (event) => event.id === eventId && String(event.group.id) === groupId,
      ) ?? null,
    [eventId, events, groupId],
  );
}
