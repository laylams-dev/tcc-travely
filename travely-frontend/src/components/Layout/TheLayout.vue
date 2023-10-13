<template>
  <a-layout class="travely-layout">
    <layout-header />
    <layout-admin-side-menu v-if="hasSideMenu" />
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
import { GithubOutlined } from '@ant-design/icons-vue'
import LayoutHeader from '../LayoutHeader/LayoutHeader.vue'
import LayoutAdminSideMenu from '../LayoutAdminSideMenu/LayoutAdminSideMenu.vue'

interface Breadcrumb {
  title: string
  id: string
}

const props = defineProps({
  breadcrumb: { type: Array<Breadcrumb>, default: [] },
  defineWidthOnFlow: { type: Boolean, default: false },
  hasSideMenu: { type: Boolean, default: false }
})

const contentClass = computed(() => {
  return props.defineWidthOnFlow ? 'travely-content' : 'travely-content travely-content-size'
})
</script>

<style scoped src="./TheLayout.css" />
