import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateUser from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateUser)

      if (payload.password !== payload.checkPassword) {
        throw new Error('As senhas devem ser idênticas')
      }

      if (!payload.agreeWithTerms) {
        throw new Error('Por favor, concorde com os termos de uso')
      }

      if (!/[0-9]/.test(payload.password) || !/[A-Z]/.test(payload.password)) {
        throw new Error()
      }

      await Database.transaction(async (trx) => {
        const user = new User()
        user.email = payload.email
        user.password = payload.password

        user.useTransaction(trx)
        await user.save()
      })

      response.created()
    } catch (err) {
      response.badRequest(err)
    }
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
