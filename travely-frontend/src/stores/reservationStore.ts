import { defineStore } from 'pinia'

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    /** @type { number } */
    quantity: 0,
    /** @type { string } */
    dateFrom: '',
    /** @type { string } */
    dateTo: ''
  }),
  actions: {
    updateQuantity(newQuantity: number) {
      this.quantity = newQuantity
    },
    updateDateFrom(newDateFrom: string) {
      this.dateFrom = newDateFrom
    },
    updateDateTo(newDateTo: string) {
      this.dateTo = newDateTo
    }
  }
})
