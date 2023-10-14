import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.smallint('room_number').unsigned().notNullable().unique()
      table.integer('room_model_id').unsigned().notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.charset('utf8mb4')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('room_model_id').references('room_models.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
