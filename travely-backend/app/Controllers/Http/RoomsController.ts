import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Room from 'App/Models/Room'
import RoomValidator from 'App/Validators/RoomValidator'

export default class RoomsController {
  public async index({}: HttpContextContract) {
    return await Database.from('rooms').select('*')
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(RoomValidator)

    await Database.transaction(async (trx) => {
      const room = new Room()

      room.roomNumber = payload.roomNumber
      room.capacity = payload.capacity
      room.description = payload.description
      room.isActive = payload.isActive
      room.chargePerDay = payload.chargePerDay
      room.hasAirConditioning = payload.hasAirConditioning
      room.hasPrivateBathroom = payload.hasPrivateBathroom
      room.useTransaction(trx)

      await room.save()
    })

    response.created()
  }

  public async store({}: HttpContextContract) {}

  public async show({ params, response }: HttpContextContract) {
    const room = await Room.find(params.id)

    response.ok(room)
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async listAll({}: HttpContextContract) {}
}
