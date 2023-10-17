<template>
     <the-layout define-width-on-flow>
        <a-typography-title>Sua reserva está confirmada! <CheckCircleTwoTone two-tone-color="#48eb2f" /></a-typography-title>
            <div class="feedback-container flex-row">
            <div class="feedback-card">
                <div class="flex-column">
                    <div class="flex-row">
                    <img
                    class="home-welcome-carousel-img"
                    :src="Room1"
                    alt="Imagem da piscina da pousada Travely"
                />
                <div class="flex-column margin-start">
                    <h2>Suite Single Standard</h2>
                    ★★★★
                    <br/><br/>
                    <span class="text-muted">{{ formatedDateFrom }} - {{ formatedDateTo }}</span>
                    <br/>
                    <span class="text-muted">{{ useReservation.quantity }} Hóspedes
                    <br/><br/></span>
                    <h3 class="mt-2">Informações de preço</h3>
                    <div class="reservation-amount-row">
                        <div class="flex-column">
                        <span>R$ 620,00 x {{ daysOnReserve }} noites</span>
                        <span class="mt-1">Taxa de serviço</span>
                    </div>
                    <div class="flex-column">
                        <strong>R$ {{ subtotal }}</strong>
                        <strong class="mt-1">R$ 179,00</strong>
                    </div>
                    </div>
                    <a-divider class="mt-2" />
                    <div class="reservation-amount-row">
                        <h2>Total</h2>
                        <h2>R$ {{ totalAmount }}</h2>
                    </div>
                </div>
                </div>
              </div>
            </div>
            <div class="flex-column">
                <br><br><br><br>
                <div class="flex-row mt-2">
                    <CheckOutlined style="color: green; font-size: 22px; margin-right: 0.6rem" /> 
                     <h2>A acomodação estará à sua espera em {{ formatedDateFrom }}</h2>
                </div>
                <div class="flex-row mt-2">
                    <CheckOutlined style="color: green; font-size: 22px; margin-right: 0.6rem" /> 
                     <h2>Você pode visualizar os dados de sua reserva no menu Minha Conta</h2>
                </div>
                <div class="flex-row mt-2">
                    <CheckOutlined style="color: green; font-size: 22px; margin-right: 0.6rem" /> 
                     <h2> Você pode solicitar o cancelamento gratuito até 24 horas antes da data do check-in</h2>
                </div>
                <br><br><br><br>
                <a-button 
                class="edit-reservation-button" 
                type="primary"
                @click="goToHome"
                >
                    Voltar para Home
                </a-button>
            </div>
        </div>
</the-layout>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import TheLayout from '@/components/Layout/TheLayout.vue'
import Room1 from '@/assets/public/quarto-1.jpg'
import { CheckCircleTwoTone, CheckOutlined } from '@ant-design/icons-vue';
import { useReservationStore } from '@/stores/reservationStore'
import { useRouter } from 'vue-router'

const useReservation = useReservationStore();

function onDateFormat(dataString: string): string {
  const data = new Date(dataString);
  const day = data.getDate().toString().padStart(2, '0');
  const month = (data.getMonth() + 1).toString().padStart(2, '0');
  const year = data.getFullYear();
  return `${day}/${month}/${year}`;
}

const formatedDateTo = ref(onDateFormat(useReservation.dateTo));
const formatedDateFrom = ref(onDateFormat(useReservation.dateFrom));


const router = useRouter()

const goToHome = () => {
    router.push({
      name: 'home'
    })
};

function getDay(dataString: string): number {
  const dateParts = dataString.split('/');
  if (dateParts.length === 3) {
    const day = parseInt(dateParts[0]);
    return day;
  } else {
    return 0;
  }
};

const daysOnReserve: number = Number(getDay(formatedDateTo.value) - Number(getDay(formatedDateFrom.value)));

const subtotal = computed(() => router.currentRoute.query?.subtotal || '4340,00');
const totalAmount = computed(() => router.currentRoute.query?.totalAmount || '4519,00');

</script>
<style scoped src="./ReservationFeedbackStep.css" />