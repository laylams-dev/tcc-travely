import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import RoomModel from 'App/Models/RoomModel'
import RoomModelValidator from 'App/Validators/RoomModelValidator'

export default class RoomModelsController {
  public async indexAdmin({ request }: HttpContextContract) {
    const page = parseInt(request.qs().page, 10)
    const limit = parseInt(request.qs().limit, 10)
    const capacity = parseInt(request.qs().capacity, 10)

    const hasInformedCapacity = !Number.isNaN(capacity) && capacity > 0

    const roomsModels = await Database.from('room_models')
      .forPage(page, limit)
      .select('*')
      .if(hasInformedCapacity, (query) => {
        query.where('capacity', '=', capacity)
      })
      .orderBy('id', 'asc')

    const [count] = await Database.from('room_models')
      .if(hasInformedCapacity, (query) => {
        query.where('capacity', '=', capacity)
      })
      .count('* as total')

    return {
      roomsModels,
      total: count.total,
    }
  }

  public async index({ request }: HttpContextContract) {
    const page = parseInt(request.qs().page, 10)
    const limit = parseInt(request.qs().size, 10)
    const capacity = parseInt(request.qs().capacity, 10)

    const hasInformedCapacity = !Number.isNaN(capacity) && capacity > 0

    const roomsModels = await Database.from('room_models')
      .select('*')
      .if(hasInformedCapacity, (query) => {
        query.where('capacity', '=', capacity)
      })
      .andWhere('is_active', '=', true)
      .forPage(page, limit)
      .orderBy('id', 'asc')

    const [count] = await Database.from('room_models')
      .if(hasInformedCapacity, (query) => {
        query.where('capacity', '=', capacity)
      })
      .andWhere('is_active', '=', true)
      .count('* as total')

    return {
      roomsModels,
      total: count.total,
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(RoomModelValidator)

    await Database.transaction(async (trx) => {
      const roomModel = new RoomModel()
      roomModel.name = payload.name
      roomModel.capacity = payload.capacity
      roomModel.description = payload.description
      roomModel.isActive = payload.isActive
      roomModel.chargePerDay = payload.chargePerDay
      roomModel.hasAirConditioning = payload.hasAirConditioning
      roomModel.hasPrivateBathroom = payload.hasPrivateBathroom
      roomModel.useTransaction(trx)

      await roomModel.save()
    })

    response.created()
  }

  public async show({ params }: HttpContextContract) {
    const data = await RoomModel.findOrFail(params.id)
    return data
  }

  public async toggleRoomActive({ params, request }: HttpContextContract) {
    const roomType = await RoomModel.findOrFail(params.id)

    const newActiveValue = request.input('isActive')
    if (typeof newActiveValue === 'boolean') {
      roomType.isActive = newActiveValue
    }

    await roomType.save()
  }

  public async update({ request, params }: HttpContextContract) {
    const config = await RoomModel.findOrFail(params.id)

    const name = request.input('name')
    if (typeof name === 'string') {
      config.name = name
    }

    const capacity = request.input('capacity')
    if (typeof capacity === 'number') {
      config.capacity = capacity
    }

    const description = request.input('description')
    config.description = description

    const isActive = request.input('isActive')
    if (typeof isActive === 'boolean') {
      config.isActive = isActive
    }

    const chargePerDay = request.input('chargePerDay')
    if (typeof chargePerDay === 'number') {
      config.chargePerDay = chargePerDay
    }

    const hasAirConditioning = request.input('hasAirConditioning')
    if (typeof hasAirConditioning === 'boolean') {
      config.hasAirConditioning = hasAirConditioning
    }

    const hasPrivateBathroom = request.input('hasPrivateBathroom')
    if (typeof hasPrivateBathroom === 'boolean') {
      config.hasPrivateBathroom = hasPrivateBathroom
    }

    await config.save()
  }

  public async getRoomsByModel({ request }: HttpContextContract) {
    const page = parseInt(request.qs().page, 10)
    const limit = parseInt(request.qs().size, 10)
    const capacity = parseInt(request.qs().capacity, 10)
    const dateFrom = request.qs().dateFrom
    const dateTo = request.qs().dateTo

    const modelsThatHaveAvailableRooms = await Database.from('room_models as models')
      .select('models.*')
      .distinct()
      .join('rooms as rooms', 'room_model_id', '=', 'models.id')
      .leftJoin('reservations as reservations', 'reservations.room_id', '=', 'rooms.id')
      .where('models.capacity', '>=', capacity)
      .andWhere('models.is_active', '=', true)
      .andWhereRaw(
        `((reservations.date_from not between ${dateFrom} and DATE_SUB(${dateTo}, INTERVAL 1 DAY) and reservations.date_to not between DATE_ADD(${dateFrom}, INTERVAL 1 DAY) and ${dateTo}) or reservations.id is null)`
      )
      .forPage(page, limit)
      .orderBy('models.capacity', 'asc')

    return {
      modelsThatHaveAvailableRooms,
    }
  }
}
