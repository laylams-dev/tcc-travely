import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BedValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    bedType: schema.enum(['CRADLE', 'DOUBLE', 'KING', 'QUEEN', 'SINGLE']),
    quantity: schema.number([rules.unsigned(), rules.required()]),
  })

  public messages: CustomMessages = {}
}
