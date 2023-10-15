import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Room from 'App/Models/Room'

export default class extends BaseSeeder {
  public async run() {
    await Room.createMany([
      {
        roomNumber: 101,
        roomModelId: 1,
      },
      {
        roomNumber: 102,
        roomModelId: 1,
      },
      {
        roomNumber: 103,
        roomModelId: 2,
      },
      {
        roomNumber: 104,
        roomModelId: 2,
      },
      {
        roomNumber: 105,
        roomModelId: 3,
      },
      {
        roomNumber: 106,
        roomModelId: 3,
      },
      {
        roomNumber: 107,
        roomModelId: 4,
      },
      {
        roomNumber: 108,
        roomModelId: 4,
      },
      {
        roomNumber: 201,
        roomModelId: 5,
      },
      {
        roomNumber: 202,
        roomModelId: 5,
      },
      {
        roomNumber: 203,
        roomModelId: 6,
      },
      {
        roomNumber: 204,
        roomModelId: 6,
      },
      {
        roomNumber: 205,
        roomModelId: 7,
      },
      {
        roomNumber: 206,
        roomModelId: 7,
      },
      {
        roomNumber: 207,
        roomModelId: 4,
      },
      {
        roomNumber: 208,
        roomModelId: 6,
      },
    ])
  }
}
