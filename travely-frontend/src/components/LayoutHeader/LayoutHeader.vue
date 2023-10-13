<template>
  <div>
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
                <a-menu-item v-if="isUserAdmin" @click="goToManagement">
                  <BarsOutlined /> Acessar area administrativa
                </a-menu-item>
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { BarsOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import TravelyLogo from '@/assets/public/travely-logo.png'
import ThemeSwitchButton from '@/components/ThemeSwitchButton/ThemeSwitchButton.vue'
import { useUserStore } from '@/stores/userStore'

const user = useUserStore()

const userIsLogged = computed(() => {
  return user.$state.id !== 0
})

const isUserAdmin = computed(() => {
  return user.$state.id !== 0 && user.$state.role === 'ADMIN'
})

const router = useRouter()
const route = useRoute()

const showLoginButtom = computed(() => {
  return route.name !== 'login'
})

const showCreateAccountButtom = computed(() => {
  return route.name !== 'createAccount'
})

function goToLogin() {
  router.push({ name: 'login' })
}

function goToCreateAccount() {
  router.push({ name: 'createAccount' })
}

function goToManagement() {
  router.push({ name: 'managementHome' })
}

async function logout() {
  try {
    await user.logout()
    user.updateFullUser({
      created_at: '',
      email: '',
      id: 0,
      role: 'USER'
    })
  } catch {
    user.updateFullUser({
      created_at: '',
      email: '',
      id: 0,
      role: 'USER'
    })
  } finally {
    message.success('Você foi deslogado com sucesso!')
    router.push({ name: 'home' })
  }
}
</script>

<style scoped src="./LayoutHeader.css" />
