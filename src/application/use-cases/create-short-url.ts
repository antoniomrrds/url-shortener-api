import { IUniqueIDGenerator } from '@/application/ports/crypto'
import { ICreateShortUrlUseCase } from '@/domain/use-cases'

export class CreateShortUrl {
  constructor (private readonly crypto: IUniqueIDGenerator) { }

  async perform (input: ICreateShortUrlUseCase.Input): Promise<void> {
    this.crypto.generateUniqueId()
  }
}
