<script setup lang="ts">
import UserNavbar from "../components/navigation/UserNavbar.vue";
</script>

<template>
  <div>
    <UserNavbar />
    <main>
      <router-view />
    </main>
  </div>
</template>
