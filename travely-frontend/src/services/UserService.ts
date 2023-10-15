import { type CreateAccountRequest } from '@/types/UserTypes.d'

import baseInstance from './ApiClientService'
const UserService = {
  createAccount(data: CreateAccountRequest) {
    return baseInstance.post('/user', data)
  }
}

export default UserService
