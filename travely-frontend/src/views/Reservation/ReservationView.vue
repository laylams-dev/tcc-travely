<template>
  <the-layout define-width-on-flow>
    <a-typography-title>Faça sua reserva</a-typography-title>

    <a-steps label-placement="vertical" :current="currentStep" :items="stepItems" />
 
    <reservation-login-step v-if="currentStep === 0" />
    <reservation-confirm-step 
      v-else-if="currentStep === 1" 
    />
  </the-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TheLayout from '@/components/Layout/TheLayout.vue'
import { useUserStore } from '@/stores/userStore'
import ReservationLoginStep from './ReservationLoginStep/ReservationLoginStep.vue'
import ReservationConfirmStep from './ReservationConfirmStep/ReservationConfirmStep.vue'

const user = useUserStore()

const stepItems = ref([
  {
    title: 'Login'
  },
  {
    title: 'Confirmar a acomodação'
  }
])

const currentStep = ref(0)

function init() {
  currentStep.value = user.$state.id === 0 ? 0 : 1
}

init()
</script>

<style scoped></style>
