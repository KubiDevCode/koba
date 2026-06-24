import { useCallback, useEffect, useState } from "react";
import type { EventWithGroup } from "../../entities/archive";
import { useEventStore } from "../../pages/event/model/eventStore";
import { useGroupStore } from "../../pages/group/model/groupStore";
import {
  getTelegramFirstName,
  initializeTelegramApp,
} from "../../shared/lib/telegram";

export function useAppData() {
  const [userName] = useState(getTelegramFirstName);
  const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

  const groups = useGroupStore((state) => state.groups);
  const loading = useGroupStore((state) => state.loading);
  const error = useGroupStore((state) => state.error);
  const fetchGroups = useGroupStore((state) => state.fetchGroups);
  const events = useEventStore((state) => state.events);
  const eventsLoading = useEventStore((state) => state.loading);
  const eventsError = useEventStore((state) => state.error);
  const fetchEventsByUserId = useEventStore((state) => state.fetchEventsByUserId);

  useEffect(initializeTelegramApp, []);

  useEffect(() => {
    void fetchGroups(userId);
    void fetchEventsByUserId(userId);
  }, [fetchEventsByUserId, fetchGroups, userId]);

  const reloadGroups = useCallback(() => {
    return Promise.all([
      fetchGroups(userId, { force: true }),
      fetchEventsByUserId(userId, { force: true }),
    ]).then(() => undefined);
  }, [fetchEventsByUserId, fetchGroups, userId]);

  const visibleEvents = userId
    ? events
    : groups.flatMap((group) => group.events);

  const eventsWithGroup: EventWithGroup[] = visibleEvents.flatMap((event) => {
    const group = groups.find((item) => item.id === event.groupId);

    if (!group) {
      return [];
    }

    return [{ ...event, group }];
  });

  return {
    userId,
    userName,
    groups,
    events: visibleEvents,
    eventsWithGroup,
    loading: loading || eventsLoading,
    error: error ?? eventsError,
    reloadGroups,
  };
}
