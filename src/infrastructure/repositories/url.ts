import { ICreateShortUrlRepository } from '@/application/ports/repositories'
import { PgUrl } from '@/infrastructure/typeorm/entities'

import { DataSource } from 'typeorm'

export class PgUrlRepository implements ICreateShortUrlRepository {
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
