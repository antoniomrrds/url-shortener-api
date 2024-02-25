import { ICreateShortUrlRepository } from '@/application/ports/repositories'
import { mockUrlOutput } from '@/tests/domain/mocks'

export class CreateShortUrlRepositorySpy implements ICreateShortUrlRepository {
  input?: ICreateShortUrlRepository.Input
  callsCount = 0
  output = mockUrlOutput()

  async create (input: ICreateShortUrlRepository.Input): Promise<ICreateShortUrlRepository.Output> {
    this.callsCount++
    this.input = input
    return this.output
  }
}
