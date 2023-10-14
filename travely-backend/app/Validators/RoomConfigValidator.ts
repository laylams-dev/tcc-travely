import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomConfigValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cradle: schema.number([rules.unsigned(), rules.required()]),
    doubleBed: schema.number([rules.unsigned(), rules.required()]),
    kingBed: schema.number([rules.unsigned(), rules.required()]),
    queenBed: schema.number([rules.unsigned(), rules.required()]),
    singleBed: schema.number([rules.unsigned(), rules.required()]),
  })

  public messages: CustomMessages = {}
}
