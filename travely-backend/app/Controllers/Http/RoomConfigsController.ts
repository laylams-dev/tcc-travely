import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import RoomConfig from 'App/Models/RoomConfig'
import RoomConfigValidator from 'App/Validators/RoomConfigValidator'

export default class BedsController {
  public async index({ request }: HttpContextContract) {
    const page = parseInt(request.qs().page, 10)
    const limit = parseInt(request.qs().size, 10)

    const beds = await Database.from('room_configs')
      .forPage(page, limit)
      .select('*')
      .orderBy('id', 'asc')
    const [count] = await Database.from('room_configs').count('* as total')

    return {
      beds,
      total: count.total,
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(RoomConfigValidator)

      await Database.transaction(async (trx) => {
        const config = new RoomConfig()

        config.cradle = payload.cradle
        config.doubleBed = payload.doubleBed
        config.kingBed = payload.kingBed
        config.queenBed = payload.queenBed
        config.singleBed = payload.singleBed

        config.useTransaction(trx)
        await config.save()
      })

      response.created()
    } catch (err) {
      response.badRequest(err)
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const config = await RoomConfig.findOrFail(params.id)

    const newCradleValue = request.input('cradle')
    if (typeof newCradleValue === 'number') {
      config.cradle = newCradleValue
    }

    const newDoubleBedValue = request.input('doubleBed')
    if (typeof newDoubleBedValue === 'number') {
      config.doubleBed = newDoubleBedValue
    }

    const newKingBedValue = request.input('kingBed')
    if (typeof newKingBedValue === 'number') {
      config.kingBed = newKingBedValue
    }

    const newQueenBedValue = request.input('queenBed')
    if (typeof newQueenBedValue === 'number') {
      config.queenBed = newQueenBedValue
    }

    const newSingleBedValue = request.input('singleBed')
    if (typeof newSingleBedValue === 'number') {
      config.singleBed = newSingleBedValue
    }

    await config.save()
  }

  public async show({ params }: HttpContextContract) {
    const data = await RoomConfig.findOrFail(params.id)
    return data
  }
}
