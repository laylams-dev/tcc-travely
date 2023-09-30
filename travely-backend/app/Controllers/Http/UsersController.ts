import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
// import { schema, rules } from '@ioc:Adonis/Core/Validator'
import CreateUser from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUser)

    // await Database.transaction(async (trx) => {
    //   await trx
    //     .insertQuery()
    //     .table('users')
    //     .insert({
    //       ...payload,
    //       role: 'user',
    //     })
    // })

    await Database.transaction(async (trx) => {
      const user = new User()
      user.email = payload.email
      user.password = payload.password
      user.rememberMeToken = payload.rememberMeToken || null

      user.useTransaction(trx)
      await user.save()
    })

    response.created()
    // const data = request.only(["email", "password", "remember_me_token"])

    // const user = await User.create(data)

    // return user
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
