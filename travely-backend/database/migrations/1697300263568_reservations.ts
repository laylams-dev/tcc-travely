import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.date('date_from').notNullable()
      table.date('date_to').notNullable()
      table
        .enum('status', ['CONFIRMED', 'PAYMENT_PENDING', 'CANCELED'])
        .notNullable()
        .defaultTo('PAYMENT_PENDING')
      table
        .enum('payment_method', ['PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BANKING_BILLET'])
        .notNullable()
      table.text('observation').nullable()
      table.boolean('need_parking').notNullable().defaultTo(false)
      table.string('license_plate', 7).nullable()
      table.integer('client_id').unsigned().notNullable()
      table.integer('room_id').unsigned().notNullable()
      table.integer('selected_room_config_id').unsigned().notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.charset('utf8mb4')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('client_id').references('users.id').onDelete('CASCADE')
      table.foreign('room_id').references('rooms.id').onDelete('CASCADE')
      table.foreign('selected_room_config_id').references('room_configs.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
