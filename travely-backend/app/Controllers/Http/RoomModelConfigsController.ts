import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import RoomModelConfig from 'App/Models/RoomModelConfig'
import RoomModelConfigValidator from 'App/Validators/RoomModelConfigValidator'

export default class RoomModelConfigsController {
  public async index({ request }: HttpContextContract) {
    const page = parseInt(request.qs().page, 10)
    const limit = parseInt(request.qs().size, 10)

    const modelConfig = await Database.from('room_model_configs')
      .select('*')
      .forPage(page, limit)
      .orderBy('id', 'asc')
    const [count] = await Database.from('room_model_configs').count('* as total')

    return {
      modelConfig,
      total: count.total,
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(RoomModelConfigValidator)

    await Database.transaction(async (trx) => {
      const modelConfig = new RoomModelConfig()

      modelConfig.roomModelId = payload.roomModelId
      modelConfig.roomConfigId = payload.roomConfigId

      modelConfig.useTransaction(trx)

      await modelConfig.save()
    })

    response.created()
  }

  public async show({ params }: HttpContextContract) {
    const data = await RoomModelConfig.findOrFail(params.id)
    return data
  }

  public async update({ request, params }: HttpContextContract) {
    const modelConfig = await RoomModelConfig.findOrFail(params.id)

    const roomModelId = request.input('roomModelId')
    if (typeof roomModelId === 'number') {
      modelConfig.roomModelId = roomModelId
    }

    const roomConfigId = request.input('roomConfigId')
    if (typeof roomConfigId === 'number') {
      modelConfig.roomConfigId = roomConfigId
    }

    await modelConfig.save()
  }
}
