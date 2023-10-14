import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Reservation from 'App/Models/Reservation'

export default class extends BaseSeeder {
  public async run() {
    await Reservation.createMany([
      {
        dateFrom: '2023-11-01',
        dateTo: '2023-11-08',
        status: 'CONFIRMED',
        paymentMethod: 'PIX',
        observation: 'Horário aproximado de chegada: 16h',
        needParking: true,
        licensePlate: 'GLW7281',
        clientId: 1,
        roomId: 9,
        selectedRoomConfigId: 11,
      },
    ])
  }
}
