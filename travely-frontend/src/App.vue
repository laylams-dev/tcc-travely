<template>
  <div class="system-height">
    <a-config-provider
      :theme="{
        algorithm: currentTheme
      }"
    >
      <RouterView />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { theme } from 'ant-design-vue'
import { useUserStore } from '@/stores/userStore'

const user = useUserStore()

user.getAuthenticatedUser()

const currentTheme = computed(() => {
  return user.$state.darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm
})
</script>

<style scoped>
.system-height {
  height: 100%;
}
</style>
