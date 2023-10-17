import { type getParticipants, type getPaymentStatus, type requestPayment } from '@/types/OpbTypes.d'

import baseInstance from './ApiClientService'
const OpbService = {
  getParticipants(data: getParticipants) {
    return baseInstance.get('/v1/participantes', data)
  },
  requestPayment(data: requestPayment) {
    return baseInstance.post('/v1/pagamentos/pix', data)
  },
  getPaymentStatus(data: getPaymentStatus) {
    return baseInstance.get('/v1/pagamentos/pix', data)
  },
}

export default OpbService
