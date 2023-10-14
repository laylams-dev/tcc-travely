import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    roomNumber: schema.number([rules.unsigned(), rules.required()]),
    roomModelId: schema.number([rules.unsigned(), rules.required()]),
  })

  public messages: CustomMessages = {}
}
