import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomTypeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.required(), rules.trim(), rules.maxLength(100)]),
    capacity: schema.number([rules.unsigned(), rules.required(), rules.range(1, 99)]),
    description: schema.string.optional([rules.trim(), rules.maxLength(500)]),
    isActive: schema.boolean(),
    chargePerDay: schema.number([rules.unsigned(), rules.range(0, 99999)]),
    hasAirConditioning: schema.boolean(),
    hasPrivateBathroom: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
