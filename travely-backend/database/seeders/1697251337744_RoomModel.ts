import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RoomModel from 'App/Models/RoomModel'

export default class extends BaseSeeder {
  public async run() {
    RoomModel.createMany([
      {
        name: 'Single Basic',
        capacity: 1,
        description:
          'Quarto básico, para viajantes desacompanhados que buscam uma cama confortável para dormir',
        isActive: true,
        chargePerDay: 168.5,
        hasAirConditioning: false,
        hasPrivateBathroom: false,
      },
      {
        name: 'Single Standard',
        capacity: 1,
        description:
          'Quarto padrão, com banheiro privativo para uma pessoa que busca conforto e comodidade',
        isActive: true,
        chargePerDay: 200,
        hasAirConditioning: false,
        hasPrivateBathroom: true,
      },
      {
        name: 'Single Plus',
        capacity: 1,
        description:
          'Quarto premium, com banheiro privativo e ar condicionado para uma pessoa que busca um ambiente tranquilo e equipado para seu descanso',
        isActive: true,
        chargePerDay: 259.98,
        hasAirConditioning: true,
        hasPrivateBathroom: true,
      },
      {
        name: 'Double Standard',
        capacity: 2,
        description:
          'Quarto padrão, com banheiro privativo para um casal ou duas pessoas que buscam conforto e comodidade',
        isActive: true,
        chargePerDay: 259.98,
        hasAirConditioning: false,
        hasPrivateBathroom: true,
      },
      {
        name: 'Triple Standard',
        capacity: 3,
        description:
          'Quarto padrão, com banheiro privativo para três pessoas ou uma pequena família que busca conforto e comodidade',
        isActive: true,
        chargePerDay: 299.98,
        hasAirConditioning: false,
        hasPrivateBathroom: true,
      },
      {
        name: 'Double Plus',
        capacity: 2,
        description:
          'Quarto premium, com banheiro privativo e ar condicionado para quem busca um ambiente tranquilo e equipado para seu descanso',
        isActive: true,
        chargePerDay: 359.98,
        hasAirConditioning: true,
        hasPrivateBathroom: true,
      },
      {
        name: 'Triple Plus',
        capacity: 3,
        description:
          'Quarto premium, com banheiro privativo e ar condicionado para quem busca um ambiente tranquilo e equipado para seu descanso',
        isActive: true,
        chargePerDay: 499.93,
        hasAirConditioning: true,
        hasPrivateBathroom: true,
      },
    ])
    // Write your database queries inside the run method
  }
}
