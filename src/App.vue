<template>
  <router-view />
</template>

<script setup lang="ts">

import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth.store";

const auth = useAuthStore();

onMounted(async () => {
  if (auth.token && !auth.user) {
    try {
      await auth.fetchMe();
    } catch {
      auth.logout();
    }
  }
});
</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
