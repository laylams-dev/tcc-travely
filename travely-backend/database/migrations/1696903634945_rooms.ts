import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.smallint('room_number').unsigned().notNullable()
      table.tinyint('capacity').unsigned().notNullable()
      table.text('description')
      table.boolean('is_active').notNullable().defaultTo(false)
      table.decimal('charge_per_day', 7, 2).unsigned().notNullable()
      table.boolean('has_air_conditioning').notNullable().defaultTo(true)
      table.boolean('has_private_bathroom').notNullable().defaultTo(true)
      table.charset('utf8mb4')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
