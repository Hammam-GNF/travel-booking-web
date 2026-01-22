<script setup lang="ts">
import { useAuthStore } from "../../stores/auth.store";

const auth = useAuthStore();
</script>

<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome admin, {{ auth.user?.name }}</p>
  </div>
</template>
