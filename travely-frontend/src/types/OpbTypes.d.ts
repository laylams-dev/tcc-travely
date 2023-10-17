export interface getParticipants {
  organization: string
  name: string
}

export interface requestPayment {
  payer: {
    idParticipant: string
    cpf?: string
    cnpj?: string
  }
  receiver: {
    bankCode: string
    agency: string
    document: string
    name: string
    accountNumber: string
    accountType: string
  }
  amount: string
  cityCodeIbge: string
  aditionalInfo: string
  paymentId: string
  schedulingDate: string
}

export interface getPaymentStatus {
  startDate: string
  endDate: string
  quant: string
  page: string
  status: string
  id: string
}
