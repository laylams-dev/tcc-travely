<template>
  <a-result status="warning" title="Para prosseguir, você precisa efetuar login">
    <template #extra>
      <a-button type="primary" @click="goToLogin">Fazer login</a-button>
      <a-button type="primary" @click="goToCreateAccount"> Criar conta </a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push({
    name: 'login',
    query: {
      goBackTo: 'reservation'
    }
  })
}

const goToCreateAccount = () => {
  router.push({ name: 'createAccount' })
}
</script>
