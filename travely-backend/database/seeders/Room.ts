import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Room from 'App/Models/Room'
import RoomFactory from 'Database/factories/RoomFactory'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    const rooms = await RoomFactory.createMany(10)

    await Room.createMany(rooms)
  }
}
