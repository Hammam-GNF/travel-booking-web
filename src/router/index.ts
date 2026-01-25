import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/admin/DashboardView.vue";
import UserLayout from "../layouts/UserLayout.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    // PUBLIC AREA
    {
      path: "/",
      component: DefaultLayout,
      redirect: "/login",
      children: [
        {
          path: "login",
          name: "login",
          component: LoginView,
        },
        {
          path: "register",
          name: "register",
          component: RegisterView,
        },
      ],
    },

    // ADMIN AREA
    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: DashboardView,
        },
      ],
    },

    // USER AREA
    {
      path: "/user",
      component: UserLayout,
      meta: { requiresAuth: true, requiresAdmin: false },
      children: [
        {
          path: "dashboard",
          name: "home",
          component: HomeView,
        },
      ],
    },

    {
      path: "/:pathMatch(.*)*",
      redirect: () => {
        const auth = useAuthStore();
        if (!auth.token) return { name: "login" };
        return auth.user?.role === "admin"
          ? { name: "admin-dashboard" }
          : { name: "home" };
      },
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  const ispublicPages = ["login", "register"].includes(to.name as string);
  const requiresAuth = to.meta.requiresAuth === true;
  const requiresAdmin = to.meta.requiresAdmin === true;

  // 1. Pastikan auth siap
  if (!auth.initiailzed) {
    await auth.initAuth();
  }

  // 2. Sudah login → dilarang ke public page
  if (auth.isLoggedIn && ispublicPages) {
    return auth.isAdmin
      ? { name: "admin-dashboard" }
      : { name: "home" };
  }

  // 3. Belum login → dilarang ke protected
  if (!auth.isLoggedIn && requiresAuth) {
    return { name: "login" };
  }

  // 4. Non-admin masuk admin
  if (requiresAdmin && !auth.isAdmin) {
    return { name: "home" };
  }

  return true;
});
