import { UrlEntity } from '@/domain/entities'

export interface ICreateShortUrlUseCase {
  perform: (input: ICreateShortUrlUseCase.Input) => Promise<ICreateShortUrlUseCase.Output>
}

export namespace ICreateShortUrlUseCase {
  export type Input = {
    originalUrl: string
  }
  export type Output = UrlEntity
}
