import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PgUrl {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    originalUrl!: string

  @Column()
    shortUrl!: string

  @Column()
    accessCounter!: number
}
