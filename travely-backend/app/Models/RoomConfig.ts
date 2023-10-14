import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RoomConfig extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cradle: number

  @column()
  public doubleBed: number

  @column()
  public kingBed: number

  @column()
  public queenBed: number

  @column()
  public singleBed: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
