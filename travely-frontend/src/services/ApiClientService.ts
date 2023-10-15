import axios from 'axios'

const baseInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ADDRESS,
  timeout: 1000,
  headers: { Accept: 'application/json' }
})

export default baseInstance
