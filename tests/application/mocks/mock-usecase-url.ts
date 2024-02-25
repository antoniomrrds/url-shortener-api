import { ICreateShortUrlUseCase } from '@/domain/use-cases'
import { mockUrlOutput } from '@/tests/domain/mocks'

export class CreateShortUrlSpy implements ICreateShortUrlUseCase {
  input?: ICreateShortUrlUseCase.Input
  callsCount = 0
  output = mockUrlOutput()
  async perform (input: ICreateShortUrlUseCase.Input): Promise<ICreateShortUrlUseCase.Output > {
    this.input = input
    this.callsCount++
    return this.output
  }
}
