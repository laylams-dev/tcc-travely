import { type LoginRequest } from '@/types/AuthTypes.d'
import baseInstance from './ApiClientService'

const UserService = {
  login(data: LoginRequest) {
    return baseInstance.post('login', data)
  },
  logout() {
    return baseInstance.post('logout')
  },
  checkIfUserIsLogged() {
    return baseInstance.get('auth')
  }
}

export default UserService
