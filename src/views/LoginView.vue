<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  await auth.login(email.value, password.value);

  router.replace(
    auth.isAdmin
      ? { name: "admin-dashboard" }
      : { name: "home" }
  );
};


</script>

<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" />
      <br />
      <input v-model="password" type="password" placeholder="Password" />
      <br />
      <button type="submit">Login</button>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </form>
  </div>
</template>
