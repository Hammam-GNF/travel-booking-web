<script setup lang="ts">
import { useAuthStore } from "../stores/auth.store";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = async () => {
  await auth.logout();
  router.replace({ name: "login" });
}
</script>



<template>
  <div>
    <h1>User Dashboard</h1>
    <p>Welcome, {{ auth.user?.name }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>
