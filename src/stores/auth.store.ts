import { defineStore } from "pinia";
import { loginApi, registerApi, logoutApi, meApi } from "../api/auth.api";
import type { AuthUser } from "../types/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token"),
    user: null as AuthUser | null,
    loading: false,
  }),

  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      try {
        const res = await loginApi({ email, password });
        this.token = res.data.access_token;
        if (this.token) {
        localStorage.setItem("token", this.token);
        }

        await this.fetchMe();
        } finally {
            this.loading = false;
        }
    },

    async register(name: string, email: string, password: string) {
        this.loading = true;
        try {
            const res = await registerApi({ name, email, password });
            this.token = res.data.access_token;
            if (this.token) {
        localStorage.setItem("token", this.token);
        }

        await this.fetchMe();
        } finally {
            this.loading = false;
        }
    },
    async logout() {
      await logoutApi();
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },

    async fetchMe() {
      const res = await meApi();
      this.user = res.data;
    },
  },
});