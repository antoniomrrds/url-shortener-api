import { makeCreateShortUrl } from '@/main/factories/application/use-cases'
import { CreateShortUrlController } from '@/presentation/controllers'

export const makeCreateShortUrlController = (): CreateShortUrlController => {
  const createShortUrlController = new CreateShortUrlController(makeCreateShortUrl())
  return createShortUrlController
}
