import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export type BedType = 'CRADLE' | 'DOUBLE' | 'KING' | 'QUEEN' | 'SINGLE'

export default class Bed extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bedType: BedType

  @column()
  public quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
