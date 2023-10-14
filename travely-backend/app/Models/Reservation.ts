import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dateFrom: string

  @column()
  public dateTo: string

  @column()
  public status: 'PAYMENT_PENDING' | 'CONFIRMED' | 'CANCELED'

  @column()
  public paymentMethod: 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'BANKING_BILLET'

  @column()
  public observation?: string

  @column()
  public needParking: boolean

  @column()
  public licensePlate?: string

  @column()
  public clientId: number

  @column()
  public roomId: number

  @column()
  public selectedRoomConfigId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
