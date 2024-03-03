import { PgUrlRepository } from '@/infrastructure/repositories'
import { PgDataSource } from '@/infrastructure/typeorm/config'

export const makePgUrlRepository = (): PgUrlRepository => {
  return new PgUrlRepository(PgDataSource)
}
