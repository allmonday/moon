<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>Moon</q-toolbar-title>

        <div>{{ user.email }}</div>
        <q-btn color="yellow" outline class="q-ml-sm" @click="logout">logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Links </q-item-label>
        <q-item clickable tag="a" :to="{ name: link.name }" v-for="link in essentialLinks" :key="link.name">
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-if="ready" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/user-store'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { TOKEN_NAME } from 'src/utils/auth'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const router = useRouter()
const ready = ref(false)

const essentialLinks: { title: string, name: string }[] = [
  {
    title: 'User infomation',
    name: 'user'
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const logout = () => {
  localStorage.removeItem(TOKEN_NAME);
  router.push({ name: 'login' })
}

onMounted(async () => {
  await userStore.readUser()
  ready.value = true
})
</script>
