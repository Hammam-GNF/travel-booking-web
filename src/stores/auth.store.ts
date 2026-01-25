import { defineStore } from "pinia";
import { loginApi, registerApi, logoutApi, meApi, refreshApi } from "../api/auth.api";
import type { AuthUser } from "../types/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token"),
    user: null as AuthUser | null,
    loading: false,
    initiailzed: false,
  }),

  getters: {
    isLoggedIn: (s) => !!s.token,
    isAdmin: (s) => s.user?.role === "admin",
  },

  actions: {
    async register(name: string, email: string, password: string) {
      this.loading = true;
      try {
        await registerApi({ name, email, password });
      } finally {
        this.loading = false;
      }
    },

    async login(email: string, password: string) {
      this.loading = true;
      try {
        const res = await loginApi({ email, password });

        this.token = res.data.data.access_token;
        this.user = res.data.data.user;
        if (this.token) {
          localStorage.setItem("token", this.token);
        }
        this.initiailzed = true;
      } finally {
        this.loading = false;
      }
    },

    async fetchMe() {
      const res = await meApi();
      this.user = res.data.data;
      this.initiailzed = true;
    },

    async initAuth() {
      if (!this.token || this.initiailzed) return;
      try {
        await this.fetchMe();
      } catch {
        this.clearAuth();
      }
    },

    async logout() {
      try {
        if (this.token) await logoutApi();
      } finally {
        this.clearAuth();
      }
    },

    async refreshToken() {
      const res = await refreshApi();
      this.token = res.data.access_token;
      if (this.token) {
        localStorage.setItem("token", this.token);
      }
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      this.initiailzed = true;
      localStorage.removeItem("token");
    },
  },
});
