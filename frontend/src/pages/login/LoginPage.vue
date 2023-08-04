<template>
  <div class="center">
    <q-btn v-if="show" @click="login">github login</q-btn>
  </div>
</template>

<script setup lang="ts">
import { AuthService } from 'src/client';
import { verifyToken } from 'src/utils/auth'
import { onMounted, ref } from 'vue';

const login = () => {
  AuthService.oauthGithubJwtAuthorize().then((redirect) => {
    console.log(redirect)
    window.location.href = redirect.authorization_url;
  });
}

const show = ref(false)

onMounted(() => {
  const r = verifyToken()
  if (r === 'refresh') {
    show.value = false
    login()
  } else {
    show.value = true
  }
})

</script>

<style scoped lang="scss">
.center {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
