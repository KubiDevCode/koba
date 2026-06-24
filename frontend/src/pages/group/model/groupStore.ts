import { create } from "zustand";
import type { Group } from "../../../entities/archive";
import { getGroups } from "../api/groupApi";
import { debugGroups } from "./debugGroups";

type GroupStoreState = {
    groups: Group[];
    loading: boolean;
    error: string | null;
    loadedUserId: number | null;
    fetchGroups: (userId: number | undefined, options?: { force?: boolean }) => Promise<void>;
};

export const useGroupStore = create<GroupStoreState>((set, get) => ({
    groups: [],
    loading: false,
    error: null,
    loadedUserId: null,
    fetchGroups: async (userId, options) => {
        if (!userId) {
            set({ groups: debugGroups, loading: false, error: null, loadedUserId: null });
            return;
        }

        const state = get();
        if (!options?.force && (state.loading || state.loadedUserId === userId)) {
            return;
        }

        set({ loading: true, error: null });

        try {
            const groups = await getGroups(userId);
            set({ groups, loading: false, loadedUserId: userId });
        } catch (error) {
            set({
                groups: [],
                loading: false,
                error: error instanceof Error ? error.message : "Не удалось загрузить группы",
                loadedUserId: null,
            });
        }
    },
}));