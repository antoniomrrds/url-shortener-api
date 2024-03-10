import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tbl_shortened_url' })
export class PgUrl {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ name: 'original_url' })
    originalUrl!: string

  @Column({ name: 'short_url' })
    shortUrl!: string

  @Column({ name: 'access_counter' })
    accessCounter!: number

  @CreateDateColumn()
    created_at!: Date

  @UpdateDateColumn()
    updated_at!: Date
}
