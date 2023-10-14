import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'room_configs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('cradle').unsigned().notNullable()
      table.integer('double_bed').unsigned().notNullable()
      table.integer('king_bed').unsigned().notNullable()
      table.integer('queen_bed').unsigned().notNullable()
      table.integer('single_bed').unsigned().notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.charset('utf8mb4')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
