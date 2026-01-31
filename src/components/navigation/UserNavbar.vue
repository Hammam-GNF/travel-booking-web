<script setup lang="ts">
import { useAuthStore } from "../../stores/auth.store";

const auth = useAuthStore();
</script>

<template>
  <header class="navbar">
    <nav>
      <router-link to="/user/dashboard">Dashboard</router-link>
      <router-link to="/user/bookings">My Bookings</router-link>
    </nav>

    <button @click="auth.logout">Logout</button>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
}
nav {
  display: flex;
  gap: 12px;
}
</style>
