import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});


http.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore();
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await auth.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${auth.token}`;
        return http(originalRequest);
      } catch {
        auth.logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default http;