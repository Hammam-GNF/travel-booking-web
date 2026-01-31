<script setup lang="ts">
import { useAuthStore } from "../../stores/auth.store";

const auth = useAuthStore();
</script>

<template>
  <aside class="sidebar">
    <h2>Admin Panel</h2>

    <nav>
      <router-link to="/admin/dashboard">Dashboard</router-link>
      <router-link to="/admin/travels">Travels</router-link>
      <router-link to="/admin/bookings">Bookings</router-link>
      <router-link to="/admin/payments">Payments</router-link>
    </nav>

    <button @click="auth.logout">Logout</button>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  padding: 16px;
  border-right: 1px solid #ddd;
}
nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
