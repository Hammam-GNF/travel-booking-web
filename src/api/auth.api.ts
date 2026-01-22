import http from "./http";
import type { AuthTokenResponse, AuthUser } from "../types/auth";

export const loginApi = (payload: {
    email: string;
    password: string;
}) => http.post<AuthTokenResponse>("/auth/login", payload);

export const registerApi = (payload: {
    name: string;
    email: string;
    password: string;
}) => http.post<AuthTokenResponse>("/auth/register", payload);

export const logoutApi = () => http.post("/auth/logout");

export const refreshApi = () => http.post("/auth/refresh");

export const meApi = () => http.get<AuthUser>("/auth/me");