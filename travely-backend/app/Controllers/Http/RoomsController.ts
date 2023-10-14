import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Room from 'App/Models/Room'
import RoomValidator from 'App/Validators/RoomValidator'

export default class RoomsController {
  public async index({ request }: HttpContextContract) {
    const page = parseInt(request.qs().page, 10)
    const limit = parseInt(request.qs().size, 10)

    const rooms = await Database.from('rooms').forPage(page, limit).select('*').orderBy('id', 'asc')
    const [count] = await Database.from('rooms').count('* as total')

    return {
      rooms,
      total: count.total,
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(RoomValidator)

    await Database.transaction(async (trx) => {
      const room = new Room()

      room.roomNumber = payload.roomNumber
      room.roomModelId = payload.roomModelId

      room.useTransaction(trx)
      await room.save()
    })

    response.created()
  }

  public async show({ params, response }: HttpContextContract) {
    const room = await Room.find(params.id)
    response.ok(room)
  }

  public async update({ request, params }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)

    const roomNumber = request.input('roomNumber')
    if (typeof roomNumber === 'number') {
      room.roomNumber = roomNumber
    }

    const roomModelId = request.input('roomModelId')
    if (typeof roomModelId === 'number') {
      room.roomModelId = roomModelId
    }

    await room.save()
  }

  public async delete({ params }: HttpContextContract) {
    const room = await Room.findOrFail(params.id)

    await room.delete()
  }
}
