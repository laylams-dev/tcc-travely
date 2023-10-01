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

<style scoped src="./TheLayout.css" />
