<template>
  <a-layout class="travely-layout">
    <a-layout-header>
      <a class="travely-header-logo" href="/">
        <img
          class="travely-header-logo-img"
          :src="TravelyLogo"
          alt="Logo da empresa Travely, que se parece com um avião decolando"
        />
      </a>
    </a-layout-header>
    <a-breadcrumb class="travely-breadcrumb" v-if="breadcrumb.length > 0">
      <a-breadcrumb-item v-for="item in breadcrumb" :key="item.id">
        {{ item.title }}
      </a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content class="travely-content">
      <slot />
    </a-layout-content>
    <a-layout-footer class="travely-footer">
      <a-divider />
      Travely ©2023
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import TravelyLogo from '@/assets/public/travely-logo.png'

interface Breadcrumb {
  title: string
  id: string
}

defineProps({
  breadcrumb: { type: Array<Breadcrumb>, default: [] }
  // hasSideMenu: { type: Boolean, default: true }
})
</script>

<style scoped>
.travely-layout {
  height: 100%;
}
.travely-footer {
  text-align: center;
}

.travely-header-logo {
  display: flex;
  width: fit-content;
  height: 100%;
  align-items: center;
}

.travely-header-logo-img {
  height: 3.2rem;
  cursor: pointer;
}

.travely-breadcrumb {
  margin: 1rem 0;
}

.travely-content {
  padding: 0 1rem 1rem 1rem;
  margin-top: 3rem;
}
</style>
