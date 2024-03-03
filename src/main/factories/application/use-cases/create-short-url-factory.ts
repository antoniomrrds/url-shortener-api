import { CreateShortUrl } from '@/application/use-cases'
import { makeUniqueID } from '@/main/factories/infrastructure/crypto'
import { makePgUrlRepository } from '@/main/factories/infrastructure/repositories'

export const makeCreateShortUrl = (): CreateShortUrl => {
  return new CreateShortUrl(
    makeUniqueID(),
    makePgUrlRepository()
  )
}
