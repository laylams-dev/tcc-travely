import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export type PaymentMethodEnum = 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'BANKING_BILLET'

export default class ReservationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    dateFrom: schema.date({ format: 'yyyy-MM-dd' }, [rules.required()]),
    dateTo: schema.date({ format: 'yyyy-MM-dd' }, [rules.required()]),
    paymentMethod: schema.enum(['PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BANKING_BILLET'] as const, [
      rules.required(),
    ]),
    status: schema.enum(['CONFIRMED', 'PAYMENT_PENDING', 'CANCELED'] as const, [rules.required()]),
    observation: schema.string.optional([rules.trim()]),
    needParking: schema.boolean.optional(),
    licensePlate: schema.string.optional([
      rules.trim(),
      rules.minLength(7),
      rules.maxLength(7),
      rules.requiredWhen('needParking', '=', true),
    ]),
    clientId: schema.number([rules.unsigned(), rules.required()]),
    roomId: schema.number([rules.unsigned(), rules.required()]),
    selectedRoomConfigId: schema.number([rules.unsigned(), rules.required()]),
  })

  public messages: CustomMessages = {}
}
