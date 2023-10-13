import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminAuth {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    await auth.use('web').authenticate()

    if (auth.use('web').user?.$attributes.role !== 'ADMIN') {
      response.unauthorized()
      return
    }
    await next()
  }
}
