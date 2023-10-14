import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'room_models'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('capacity').notNullable()
      table.text('description')
      table.boolean('is_active').defaultTo(true)
      table.decimal('charge_per_day', 7, 2).unsigned().notNullable()
      table.boolean('has_air_conditioning').notNullable().defaultTo(true)
      table.boolean('has_private_bathroom').notNullable().defaultTo(true)
      table.charset('utf8mb4')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
