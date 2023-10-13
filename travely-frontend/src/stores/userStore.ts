import { defineStore } from 'pinia'
import AuthService from '@/services/AuthService'

interface UserFromBack {
  created_at: string
  email: string
  id: number
  role: 'ADMIN' | 'USER'
}

export const useUserStore = defineStore('user', {
  state: () => ({
    /** @type { string } */
    createdAt: '',
    /** @type { string } */
    email: '',
    /** @type { number } */
    id: 0,
    /** @type { '', 'ADMIN' | 'USER' } */
    role: '',
    darkTheme: false
  }),
  actions: {
    updateFullUser(user: UserFromBack) {
      this.createdAt = user.created_at
      this.email = user.email
      this.id = user.id
      this.role = user.role
    },
    async getAuthenticatedUser() {
      try {
        const { data } = await AuthService.checkIfUserIsLogged()

        this.updateFullUser(data)
        return Promise.resolve()
      } catch {
        return Promise.reject()
      }
    },
    async logout() {
      try {
        await AuthService.logout()
        return Promise.resolve()
      } catch {
        return Promise.reject()
      }
    },
    toggleTheme(newDarkThemeValue: boolean) {
      this.darkTheme = newDarkThemeValue
    }
  }
})
