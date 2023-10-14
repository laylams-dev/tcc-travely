import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'room_model_configs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('room_model_id').notNullable().unsigned()
      table.integer('room_config_id').notNullable().unsigned()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.charset('utf8mb4')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('room_model_id').references('room_models.id').onDelete('CASCADE')
      table.foreign('room_config_id').references('room_configs.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
