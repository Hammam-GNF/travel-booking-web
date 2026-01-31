<script setup lang="ts">
import AdminSidebar from "../components/navigation/AdminSidebar.vue";
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>  
.admin-layout {
  display: flex;
}
.content {
  flex: 1;
  padding: 16px;
}
</style>
