<template>
  <a-layout class="travely-layout">
    <a-layout-header class="travely-layout-header">
      <a class="travely-header-logo" href="/">
        <img
          class="travely-header-logo-img"
          :src="TravelyLogo"
          alt="Logo da empresa Travely, que se parece com um avião decolando"
        />
      </a>
      <a-space>
        <theme-switch-button />
        <div v-if="userIsLogged">
          <a-dropdown>
            <a placement="bottomRight" arrow>
              {{ user.$state.email }}
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <!-- <a-menu-item>
                  Minha conta
                </a-menu-item>
                <a-menu-item>
                  Minhas reservas
                </a-menu-item> -->
                <a-menu-item @click="logout"> <LogoutOutlined /> Logout </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <a-space size="small" v-else>
          <a-button v-if="showLoginButtom" type="primary" @click="goToLogin">Fazer login</a-button>
          <a-button v-if="showCreateAccountButtom" type="primary" @click="goToCreateAccount">
            Criar conta
          </a-button>
        </a-space>
      </a-space>
    </a-layout-header>
    <a-breadcrumb class="travely-breadcrumb" v-if="breadcrumb.length > 0">
      <a-breadcrumb-item v-for="item in breadcrumb" :key="item.id">
        {{ item.title }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content :class="contentClass">
      <slot />
    </a-layout-content>
    <a-layout-footer class="travely-footer">
      <a-divider />
      <a-space size="large">
        <a
          href="http://github.com/laylams-dev/tcc-travely"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined />
          Nosso GitHub
        </a>
        <span> Travely ©2022 </span>
      </a-space>
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { DownOutlined, LogoutOutlined, GithubOutlined } from '@ant-design/icons-vue'
import TravelyLogo from '@/assets/public/travely-logo.png'
import ThemeSwitchButton from '@/components/ThemeSwitchButton/ThemeSwitchButton.vue'
import { useUserStore } from '@/stores/userStore'

interface Breadcrumb {
  title: string
  id: string
}

const props = defineProps({
  breadcrumb: { type: Array<Breadcrumb>, default: [] },
  defineWidthOnFlow: { type: Boolean, default: false }
  // hasSideMenu: { type: Boolean, default: true }
})

const user = useUserStore()

const userIsLogged = computed(() => {
  return user.$state.id !== 0
})

const router = useRouter()
const route = useRoute()

const showLoginButtom = computed(() => {
  return route.name !== 'login'
})

const showCreateAccountButtom = computed(() => {
  return route.name !== 'createAccount'
})

const goToLogin = () => {
  router.push({ name: 'login' })
}

const goToCreateAccount = () => {
  router.push({ name: 'createAccount' })
}

const logout = async () => {
  try {
    await user.logout()
    user.updateFullUser({
      created_at: '',
      email: '',
      id: 0,
      role: 'user'
    })
  } catch {
    user.updateFullUser({
      created_at: '',
      email: '',
      id: 0,
      role: 'user'
    })
  } finally {
    message.success('Você foi deslogado com sucesso!')
    router.push({ name: 'home' })
  }
}

const contentClass = computed(() => {
  return props.defineWidthOnFlow ? 'travely-content' : 'travely-content travely-content-size'
})
</script>

<style scoped src="./TheLayout.css" />
