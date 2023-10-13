import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Bed from 'App/Models/Bed'

export default class extends BaseSeeder {
  public async run() {
    await Bed.createMany([
      {
        bedType: 'CRADLE',
        quantity: 6,
      },
      {
        bedType: 'DOUBLE',
        quantity: 20,
      },
      {
        bedType: 'KING',
        quantity: 5,
      },
      {
        bedType: 'QUEEN',
        quantity: 5,
      },
      {
        bedType: 'SINGLE',
        quantity: 30,
      },
    ])
  }
}
