import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomModelConfigValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    roomModelId: schema.number([rules.unsigned(), rules.required()]),
    roomConfigId: schema.number([rules.unsigned(), rules.required()]),
  })

  public messages: CustomMessages = {}
}
