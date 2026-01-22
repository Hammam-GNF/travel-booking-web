<script setup lang="ts">
import { useAuthStore } from "../stores/auth.store";

const auth = useAuthStore();
</script>

<template>
  <div>
    <h1>User Home</h1>
    <p>Welcome, {{ auth.user?.name }}</p>
  </div>
</template>
