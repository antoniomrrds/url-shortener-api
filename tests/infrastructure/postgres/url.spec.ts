import { ICreateShortUrlRepository } from '@/application/ports/repositories'
import { DataType, newDb } from 'pg-mem'
import { Column, DataSource, Entity, PrimaryGeneratedColumn } from 'typeorm'

class PgUrlRepository implements ICreateShortUrlRepository {
  constructor (private readonly connection: DataSource) {}

  async create (input: ICreateShortUrlRepository.Input): Promise<ICreateShortUrlRepository.Output> {
    const pgUrlRepo = this.connection.getRepository(PgUrl)
    const pgUrl = await pgUrlRepo.save(input)
    return {
      id: pgUrl.id.toString(),
      shortUrl: pgUrl.shortUrl,
      originalUrl: pgUrl.originalUrl,
      accessCounter: pgUrl.accessCounter
    }
  }
}

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

describe('PgUrlRepository', () => {
  it('Should successfully create a short URL', async () => {
    const db = newDb()
    db.public.registerFunction({
      implementation: () => 'test',
      name: 'current_database'
    })
    db.public.registerFunction({
      implementation: () => 'test',
      name: 'version'
    })
    db.public.registerFunction({
      name: 'obj_description',
      returns: DataType.text,
      implementation: () => '',
      args: [DataType.regclass, DataType.text]
    })
    const connection: DataSource = await db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities: [PgUrl],
      logging: false
    })
    await connection.initialize()
    await connection.synchronize()

    const sut = new PgUrlRepository(connection)

    const createdShortUrl = await sut.create({
      shortUrl: 'any_short_url',
      originalUrl: 'any_original_url',
      accessCounter: 0
    })

    expect(createdShortUrl).toMatchObject({
      id: '1',
      shortUrl: 'any_short_url',
      originalUrl: 'any_original_url',
      accessCounter: 0
    })
  })
})
