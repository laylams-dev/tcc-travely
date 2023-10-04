import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberMe = !!request.input('rememberMeToken')

    try {
      await auth.use('web').attempt(email, password, rememberMe)
      response.ok(auth.use('web').user)
    } catch (error) {
      response.badRequest('Invalid credentials')
    }
  }

  public async chechIfIsLogged({ auth, response }: HttpContextContract) {
    try {
      await auth.use('web').authenticate()
      response.ok({ data: auth.use('web').user })
    } catch {
      response.unauthorized()
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('web').logout()
  }
}
