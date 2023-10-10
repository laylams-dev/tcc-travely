import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    roomNumber: schema.number([rules.unsigned()]),
    capacity: schema.number([rules.unsigned()]),
    description: schema.string.optional([rules.trim(), rules.maxLength(250)]),
    isActive: schema.boolean(),
    chargePerDay: schema.number([rules.unsigned(), rules.range(0, 99999)]),
    hasAirConditioning: schema.boolean(),
    hasPrivateBathroom: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
