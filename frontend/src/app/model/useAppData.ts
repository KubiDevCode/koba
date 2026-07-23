import { useCallback, useEffect } from "react";
import { useGroupStore } from "../../pages/group/model/groupStore";
import {
  getTelegramUserId,
  initializeTelegramApp,
} from "../../shared/lib/telegram";

export function useAppData() {
  const userId = getTelegramUserId();

  const loading = useGroupStore((state) => state.loading);
  const error = useGroupStore((state) => state.error);
  const fetchGroups = useGroupStore((state) => state.fetchGroups);

  useEffect(initializeTelegramApp, []);

  useEffect(() => {
    void fetchGroups(userId);
  }, [fetchGroups, userId]);

  const reloadGroups = useCallback(() => {
    return fetchGroups(userId, { force: true });
  }, [fetchGroups, userId]);

  return {
    userId,
    loading,
    error,
    reloadGroups,
  };
}
