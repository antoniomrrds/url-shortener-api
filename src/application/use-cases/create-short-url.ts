import { IUniqueIDGenerator } from '@/application/ports/crypto'
import { ICreateShortUrlRepository } from '@/application/ports/repositories'
import { ICreateShortUrlUseCase } from '@/domain/use-cases'

type Input = ICreateShortUrlUseCase.Input
type Output = ICreateShortUrlUseCase.Output

export class CreateShortUrl implements ICreateShortUrlUseCase {
  constructor (
    private readonly crypto: IUniqueIDGenerator,
    private readonly createShortUrlRepo: ICreateShortUrlRepository
  ) { }

  async perform ({ originalUrl }: Input): Promise<Output> {
    const shortUrl = this.crypto.generateUniqueId()
    return await this.createShortUrlRepo.create({
      shortUrl,
      originalUrl,
      accessCounter: 0
    })
  }
}
