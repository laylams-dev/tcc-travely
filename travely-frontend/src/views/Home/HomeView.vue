<template>
  <the-layout define-width-on-flow>
    <div class="home-content">
      <a-space size="middle" class="home-welcome">
        <a-typography-title>Boas vindas a Travely</a-typography-title>
        <img
          class="home-welcome-travely-logo-img"
          :src="TravelyLogo"
          alt="Logo da empresa Travely, que se parece com um avião decolando"
        />
      </a-space>
      <a-row
        :gutter="[16, 16]"
        :style="{ 'background-color': token.colorInfoBg }"
        align="bottom"
        class="home-welcome-filter-bar"
      >
        <a-col class="gutter-row" :span="24" :sm="24" :lg="12">
          <a-space class="home-filter-input-width" size="small" direction="vertical">
            <span :style="{ color: token.colorText }">Data da hospedagem</span>
            <a-range-picker
              v-model:value="dates"
              class="home-filter-input-width"
              format="DD-MM-YYYY"
              size="large"
            />
          </a-space>
        </a-col>
        <a-col class="gutter-row" :span="24" :sm="24" :lg="8">
          <a-space class="home-filter-input-width" size="small" direction="vertical">
            <span :style="{ color: token.colorText }">Hóspedes</span>
            <a-input-number
              v-model:value="people"
              class="home-filter-input-width"
              size="large"
              :min="1"
            />
          </a-space>
        </a-col>
        <a-col class="gutter-row" :span="24" :sm="24" :lg="4">
          <a-button
            class="home-filter-input-width"
            type="primary"
            :icon="h(SearchOutlined)"
            size="large"
            :disabled="disableReservationButton"
            @click="goToReservation"
            >Reservar</a-button
          >
        </a-col>
      </a-row>
      <a-typography-title class="home-title-spacing" :level="2">
        Nossas acomodações
      </a-typography-title>
      <a-carousel arrows autoplay>
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
            <left-circle-outlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <right-circle-outlined />
          </div>
        </template>
        <div>
          <img
            class="home-welcome-carousel-img"
            :src="Door"
            alt="Imagem da piscina da pousada Travely"
          />
        </div>
        <div>
          <img
            class="home-welcome-carousel-img"
            :src="Room1"
            alt="Imagem da piscina da pousada Travely"
          />
        </div>
        <div>
          <img
            class="home-welcome-carousel-img"
            :src="PoolImage"
            alt="Imagem da piscina da pousada Travely"
          />
        </div>
        <div>
          <img
            class="home-welcome-carousel-img"
            :src="Room2"
            alt="Imagem da piscina da pousada Travely"
          />
        </div>
        <div>
          <img
            class="home-welcome-carousel-img"
            :src="Restaurant"
            alt="Imagem da piscina da pousada Travely"
          />
        </div>
      </a-carousel>
    </div>
  </the-layout>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { theme } from 'ant-design-vue'
import { LeftCircleOutlined, RightCircleOutlined, SearchOutlined } from '@ant-design/icons-vue'
import TravelyLogo from '@/assets/public/travely-logo.png'
import PoolImage from '@/assets/public/piscina.jpg'
import Room1 from '@/assets/public/quarto-1.jpg'
import Room2 from '@/assets/public/quarto-2.jpg'
import Door from '@/assets/public/porta.jpg'
import Restaurant from '@/assets/public/salao.jpg'
import TheLayout from '@/components/Layout/TheLayout.vue'
import { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import ptbr from 'dayjs/locale/pt-br'

const { useToken } = theme
const { token } = useToken()

type RangeValue = [Dayjs, Dayjs]
dayjs.locale(ptbr)

const dates = ref<RangeValue>([dayjs(new Date()), dayjs().add(7, 'day')])

const people = ref(2)
const disableReservationButton = computed(() => {
  return people.value === 0 || !dates.value?.[0] || !dates.value?.[1]
})

const router = useRouter()
function goToReservation() {
  if (!disableReservationButton.value) {
    router.push({
      name: 'reservation',
      params: {
        people: people.value,
        dateFrom: dates.value[0].toString(),
        dateTo: dates.value[1].toString()
      }
    })
  }
}
</script>

<style scoped src="./HomeView.css" />
