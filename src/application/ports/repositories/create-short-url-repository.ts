import { ICreateShortUrlUseCase } from '@/domain/use-cases'

export interface ICreateShortUrlRepository {
  create: (input: ICreateShortUrlRepository.Input) => Promise<ICreateShortUrlRepository.Output>
}

export namespace ICreateShortUrlRepository {
  export type Input = ICreateShortUrlUseCase.Output
  export type Output = {
    id: string
    shortUrl: string
    originalUrl: string
    accessCounter: number
  }
}
