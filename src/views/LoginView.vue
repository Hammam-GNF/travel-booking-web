<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  try {
    await auth.login(email.value, password.value);

    if (auth.user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  } catch {
    alert("Login failed");
  }
};

</script>

<template>
  <div>
    <h1>Login</h1>

    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
