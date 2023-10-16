import axios from 'axios'
import { type CreateAccountRequest } from '@/types/UserTypes.d'

const baseInstance = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  timeout: 1000,
  headers: { Accept: 'application/json' }
})

const UserService = {
  createAccount(data: CreateAccountRequest) {
    return baseInstance.post('/user', data)
  },
}

export default UserService
