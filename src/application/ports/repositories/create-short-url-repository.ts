import { ICreateShortUrlUseCase } from '@/domain/use-cases'

export interface ICreateShortUrlRepository {
  create: (input: ICreateShortUrlRepository.Input) => Promise<ICreateShortUrlRepository.Output>
}

export namespace ICreateShortUrlRepository {
  export type Input = Omit<ICreateShortUrlUseCase.Output, 'id'>
  export type Output = {
    id: string
    shortUrl: string
    originalUrl: string
    accessCounter: number
  }
}
