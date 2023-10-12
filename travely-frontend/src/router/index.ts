import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import LoginView from '@/views/Login/LoginView.vue'
import CreateAccount from '@/views/CreateAccount/CreateAccountView.vue'
import ReservationView from '@/views/Reservation/ReservationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/criar-conta',
      name: 'createAccount',
      component: CreateAccount
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/fazer-reserva',
      name: 'reservation',
      component: ReservationView
    }
  ]
})

export default router
