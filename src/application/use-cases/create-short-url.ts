import { IUniqueIDGenerator } from '@/application/ports/crypto'
import { ICreateShortUrlRepository } from '@/application/ports/repositories'
import { ICreateShortUrlUseCase } from '@/domain/use-cases'

export class CreateShortUrl {
  constructor (
    private readonly crypto: IUniqueIDGenerator,
    private readonly createShortUrlRepo: ICreateShortUrlRepository
  ) { }

  async perform ({ url }: ICreateShortUrlUseCase.Input): Promise<void> {
    const shortUrl = this.crypto.generateUniqueId()
    await this.createShortUrlRepo.create({
      shortUrl,
      originalUrl: url,
      accessCounter: 0
    })
  }
}
