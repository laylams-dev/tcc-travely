import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Reservation from 'App/Models/Reservation'
import ReservationValidator, { PaymentMethodEnum } from 'App/Validators/ReservationValidator'

export default class ReservationsController {
  public async index({ request }: HttpContextContract) {
    const page = parseInt(request.qs().page, 10)
    const limit = parseInt(request.qs().size, 10)

    const rooms = await Database.from('reservations')
      .forPage(page, limit)
      .select('*')
      .orderBy('id', 'asc')
    const [count] = await Database.from('reservations').count('* as total')

    return {
      rooms,
      total: count.total,
    }
  }

  public async getClientReservations({ auth, request, response }: HttpContextContract) {
    const page = parseInt(request.qs().page, 10)
    const limit = parseInt(request.qs().size, 10)

    await auth.use('web').authenticate()
    const loggedUser = auth.use('web').user

    if (loggedUser) {
      const clientId = loggedUser.id

      const rooms = await Database.from('reservations')
        .where('client_id', '=', clientId)
        .forPage(page, limit)
        .select('*')
        .orderBy('id', 'asc')

      const [count] = await Database.from('reservations')
        .where('client_id', '=', clientId)
        .forPage(page, limit)
        .count('* as total')

      return response.ok({
        rooms,
        total: count.total,
      })
    }

    return response.unauthorized()
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(ReservationValidator)

    await Database.transaction(async (trx) => {
      const reservation = new Reservation()

      reservation.dateFrom = payload.dateFrom.toString()
      reservation.dateTo = payload.dateTo.toString()
      reservation.paymentMethod = payload.paymentMethod as PaymentMethodEnum
      reservation.status = payload.status ?? 'PAYMENT_PENDING'

      if (payload.observation) {
        reservation.observation = payload.observation
      }

      reservation.needParking = payload.needParking ?? false
      console.log('reservation.needParking', reservation.needParking)
      if (payload.needParking) {
        reservation.licensePlate = payload.licensePlate
      }
      reservation.clientId = payload.clientId
      reservation.roomId = payload.roomId
      reservation.selectedRoomConfigId = payload.selectedRoomConfigId

      reservation.useTransaction(trx)
      const result = await reservation.save()
      response.created({ id: result.id })
    })
  }

  public async updateStatus({ auth, params, response }: HttpContextContract) {
    if (params.id && params.status) {
      await auth.use('web').authenticate()
      const loggedUser = auth.use('web').user

      const reservation = await Reservation.findOrFail(params.id)
      if (loggedUser?.role === 'ADMIN' || loggedUser?.id === reservation.clientId) {
        reservation.status = params.status

        await reservation.save()
        return response.noContent()
      }

      return response.unauthorized()
    }
    return response.badGateway()
  }
}
