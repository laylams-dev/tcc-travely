import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RoomConfig from 'App/Models/RoomConfig'

export default class extends BaseSeeder {
  public async run() {
    await RoomConfig.createMany([
      {
        cradle: 0,
        doubleBed: 0,
        kingBed: 0,
        queenBed: 0,
        singleBed: 1,
      },
      {
        cradle: 1,
        doubleBed: 0,
        kingBed: 0,
        queenBed: 0,
        singleBed: 1,
      },
      {
        cradle: 0,
        doubleBed: 1,
        kingBed: 0,
        queenBed: 0,
        singleBed: 0,
      },
      {
        cradle: 0,
        doubleBed: 0,
        kingBed: 1,
        queenBed: 0,
        singleBed: 0,
      },
      {
        cradle: 0,
        doubleBed: 0,
        kingBed: 0,
        queenBed: 1,
        singleBed: 0,
      },
      {
        cradle: 0,
        doubleBed: 0,
        kingBed: 0,
        queenBed: 0,
        singleBed: 2,
      },
      {
        cradle: 1,
        doubleBed: 1,
        kingBed: 0,
        queenBed: 0,
        singleBed: 0,
      },
      {
        cradle: 1,
        doubleBed: 0,
        kingBed: 1,
        queenBed: 0,
        singleBed: 0,
      },
      {
        cradle: 1,
        doubleBed: 0,
        kingBed: 0,
        queenBed: 1,
        singleBed: 0,
      },
      {
        cradle: 1,
        doubleBed: 0,
        kingBed: 0,
        queenBed: 0,
        singleBed: 2,
      },
      {
        cradle: 0,
        doubleBed: 1,
        kingBed: 0,
        queenBed: 0,
        singleBed: 1,
      },
      {
        cradle: 0,
        doubleBed: 0,
        kingBed: 1,
        queenBed: 0,
        singleBed: 1,
      },
      {
        cradle: 0,
        doubleBed: 0,
        kingBed: 0,
        queenBed: 1,
        singleBed: 1,
      },
      {
        cradle: 0,
        doubleBed: 0,
        kingBed: 0,
        queenBed: 0,
        singleBed: 3,
      },
    ])
  }
}
