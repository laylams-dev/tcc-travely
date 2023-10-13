import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Bed, { BedType } from 'App/Models/Bed'
import BedValidator from 'App/Validators/BedValidator'

export default class BedsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('size')

    const beds = await Database.from('beds').forPage(page, limit).select('*').orderBy('id', 'asc')
    const [count] = await Database.from('beds').count('* as total')

    return {
      beds,
      total: count.total,
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(BedValidator)

      await Database.transaction(async (trx) => {
        const bed = new Bed()
        bed.bedType = payload.bedType as BedType
        bed.quantity = payload.quantity

        bed.useTransaction(trx)
        await bed.save()
      })

      response.created()
    } catch (err) {
      response.badRequest(err)
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const bed = await Bed.findOrFail(params.id)

    const newBedType = request.input('bedType')
    if (request.input('bedType')) {
      bed.bedType = newBedType
    }

    const newQuantity = request.input('quantity')
    if (request.input('quantity')) {
      bed.quantity = newQuantity
    }

    await bed.save()
  }

  public async show({ params }: HttpContextContract) {
    await Bed.findOrFail(params.id)
  }
}
