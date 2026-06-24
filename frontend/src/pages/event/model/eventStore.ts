import { create } from "zustand";
import type { ArchiveEvent } from "../../../entities/archive";
import { getEventsByUserId } from "../api/eventApi";

interface EventStore {
    events: ArchiveEvent[];
    loading: boolean;
    error: string | null;
    loadedUserId: number | null;
    fetchEventsByUserId: (userId: number | undefined, options?: { force?: boolean }) => Promise<void>;
}

export const useEventStore = create<EventStore>((set, get) => ({
    events: [],
    loading: false,
    error: null,
    loadedUserId: null,
    fetchEventsByUserId: async (userId, options) => {
        if (!userId) {
            set({ events: [], loading: false, error: null, loadedUserId: null });
            return;
        }

        const state = get();
        if (!options?.force && (state.loading || state.loadedUserId === userId)) {
            return;
        }

        set({ loading: true, error: null });

        try {
            const events = await getEventsByUserId(userId);
            set({ events, loading: false, loadedUserId: userId });
        } catch (error) {
            set({
                events: [],
                loading: false,
                error: error instanceof Error ? error.message : "Не удалось загрузить события       ",
                loadedUserId: null,
            });
        }
    },
}));
