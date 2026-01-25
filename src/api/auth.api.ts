import { api } from "./axios";
import type { AuthTokenResponse, AuthUser } from "../types/auth";
import type { ApiResponse, LoginPayload } from "../types/auth";

export const registerApi = (payload: {
    name: string;
    email: string;
    password: string;
}) => api.post("/auth/register", payload);

export const loginApi = (payload: {
    email: string;
    password: string;
}) => api.post("/auth/login", payload);

export const logoutApi = () => api.post("/logout");

export const refreshApi = () => api.post("/auth/refresh");

export const meApi = () => 
    api.get<{ success: boolean; data: AuthUser }>("/me");