import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RoomModelConfig from 'App/Models/RoomModelConfig'

export default class extends BaseSeeder {
  public async run() {
    RoomModelConfig.createMany([
      {
        roomModelId: 1,
        roomConfigId: 1,
      },
      {
        roomModelId: 2,
        roomConfigId: 1,
      },
      {
        roomModelId: 3,
        roomConfigId: 1,
      },
      {
        roomModelId: 4,
        roomConfigId: 2,
      },
      {
        roomModelId: 4,
        roomConfigId: 3,
      },
      {
        roomModelId: 4,
        roomConfigId: 6,
      },
      {
        roomModelId: 5,
        roomConfigId: 7,
      },
      {
        roomModelId: 5,
        roomConfigId: 8,
      },
      {
        roomModelId: 5,
        roomConfigId: 10,
      },
      {
        roomModelId: 5,
        roomConfigId: 11,
      },
      {
        roomModelId: 5,
        roomConfigId: 14,
      },
      {
        roomModelId: 6,
        roomConfigId: 1,
      },
      {
        roomModelId: 6,
        roomConfigId: 4,
      },
      {
        roomModelId: 6,
        roomConfigId: 5,
      },
      {
        roomModelId: 6,
        roomConfigId: 6,
      },
      {
        roomModelId: 7,
        roomConfigId: 8,
      },
      {
        roomModelId: 7,
        roomConfigId: 9,
      },
      {
        roomModelId: 7,
        roomConfigId: 10,
      },
      {
        roomModelId: 7,
        roomConfigId: 12,
      },
      {
        roomModelId: 7,
        roomConfigId: 13,
      },
      {
        roomModelId: 7,
        roomConfigId: 14,
      },
    ])
    // Write your database queries inside the run method
  }
}
