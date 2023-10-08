<template>
  <div>
    <a-tooltip :title="themeButtom.tooltip">
      <a-button type="primary" shape="circle" :icon="h(themeButtom.icon)" @click="toggleTheme" />
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import IconMoon from '@/components/IconMoon/IconMoon.vue'
import IconSun from '@/components/IconSun/IconSun.vue'
import { useUserStore } from '@/stores/userStore'

const user = useUserStore()

const themeButtom = computed(() => {
  const darkSetup = {
    tooltip: 'Trocar para o tema claro',
    icon: IconSun
  }

  const lightSetup = {
    tooltip: 'Trocar para o tema escuro',
    icon: IconMoon
  }

  return user.$state.darkTheme ? darkSetup : lightSetup
})

function toggleTheme() {
  user.toggleTheme(!user.$state.darkTheme)
}
</script>
