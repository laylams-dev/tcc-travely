import Room from 'App/Models/Room'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Room, ({ faker }) => {
  return {
    roomNumber: faker.number.int({ min: 1, max: 65534 }),

    capacity: faker.number.int({ min: 1, max: 10 }),

    description: faker.lorem.lines({
      max: 4,
      min: 1,
    }),

    isActive: faker.datatype.boolean({
      probability: 0.9,
    }),

    chargePerDay: faker.number.float({ min: 300, max: 2000, precision: 0.2 }),

    hasAirConditioning: faker.datatype.boolean({
      probability: 0.6,
    }),

    hasPrivateBathroom: faker.datatype.boolean({
      probability: 0.95,
    }),
  }
}).build()
