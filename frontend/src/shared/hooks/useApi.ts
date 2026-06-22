import { useEffect, useState } from "react";

export function useApi<T>(apiCall: () => Promise<T>) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        let cancelled = false;
        
        const run = async () => {
            try {
                const result = await apiCall();

                if (!cancelled) {
                    setData(result);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : "Unknown error");
                    setData(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void run();

        return () => {
            cancelled = true;
        };
    }, [apiCall]);

    return { loading, error, data };
}
