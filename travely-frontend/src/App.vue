<template>
  <div class="system-height">
    <a-config-provider
      :theme="{
        algorithm: theme.darkAlgorithm
      }"
    >
      <RouterView />
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { theme } from 'ant-design-vue'
import { useUserStore } from '@/stores/userStore'

const user = useUserStore()

user.getAuthenticatedUser()
</script>

<style scoped>
.system-height {
  height: 100%;
}
</style>
