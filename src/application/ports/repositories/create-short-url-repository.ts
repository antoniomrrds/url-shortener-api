import { ICreateShortUrlUseCase } from '@/domain/use-cases'

export interface ICreateShortUrlRepository {
  create: (input: ICreateShortUrlRepository.Input) => Promise<void>
}

export namespace ICreateShortUrlRepository {
  export type Input = ICreateShortUrlUseCase.Output
}
