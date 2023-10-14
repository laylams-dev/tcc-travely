import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'teste@teste.com',
        password: 'Teste1234',
        role: 'USER',
      },
      {
        email: 'admin@admin.com',
        password: 'Teste1234',
        role: 'ADMIN',
      },
    ])
  }
}
