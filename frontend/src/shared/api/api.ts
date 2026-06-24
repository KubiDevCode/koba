import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL ?? "",
});

api.interceptors.request.use((config) => {
    const token = window.Telegram?.WebApp?.initData;
    if (token) {
        config.headers.set("Authorization", `tma ${token}`);
    }
    return config;
});

export default api
