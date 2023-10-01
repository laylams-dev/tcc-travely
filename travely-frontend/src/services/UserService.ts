import axios from 'axios'
import { type LoginRequest } from '@/types/UserTypes.d'

const baseInstance = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  timeout: 1000,
  headers: { Accept: 'application/json' }
})

const UserService = {
  login(data: LoginRequest) {
    return baseInstance.post('login', data)
  }
}

export default UserService