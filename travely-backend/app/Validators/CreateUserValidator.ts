import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
        caseInsensitive: true,
      }),
    ]),
    password: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(8),
      rules.maxLength(20),
    ]),
    checkPassword: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(8),
      rules.maxLength(20),
    ]),
    agreeWithTerms: schema.boolean(),
  })

  public messages: CustomMessages = {}
}
