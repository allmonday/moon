<template>
    <div class="center">
        <span>loading...</span>
    </div>
</template>
  
<script setup lang="ts">
import { AuthService } from 'src/client'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { verifyToken, TOKEN_NAME } from 'src/utils/auth'

interface CbResponse {
    access_token: string
    token_type: "bearer"
}

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const go = async () => {
    console.log('auth page')
    loading.value = true
    const code = route.query.code as string
    const state = route.query.state as string

    const resp: CbResponse = await AuthService.oauthGithubJwtCallback(code, undefined, state, undefined)

    localStorage.setItem(TOKEN_NAME, resp.access_token)
    const success = verifyToken()
    if (success) {
        console.log('jwt verified and openapi token set')
    } else {
        console.error('jwt verify failed')
    }
    router.push({ name: 'plan' })
}
onMounted(async () => {
    await go()
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
  