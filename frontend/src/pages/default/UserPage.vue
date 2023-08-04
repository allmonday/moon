<template>
  <div>
    <pre>{{ user }}</pre>
    <pre>{{ token }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from 'src/stores/user-store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { user, token } = storeToRefs(userStore);
</script>

<style scoped></style>
