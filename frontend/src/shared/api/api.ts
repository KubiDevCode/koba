import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.request.use((config) => {
    const token = window.Telegram?.WebApp?.initData;
    if (token) {
        config.headers.set("Authorization", `tma ${token}`);
    }
    return config;
});

export default api