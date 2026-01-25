<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const name = ref("");
const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  await auth.register(name.value, email.value, password.value);
  router.push("/");
};
</script>

<template>
  <div>
    <h1>Register</h1>

    <form @submit.prevent="submit">
      <input v-model="name" placeholder="Name" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </form>
  </div>
</template>
