import { UrlEntity } from '@/domain/entities'

export interface ICreateShortUrlUseCase {
  perform: (input: ICreateShortUrlUseCase.Input) => Promise<ICreateShortUrlUseCase.Output>
}

export namespace ICreateShortUrlUseCase {
  export type Input = {
    url: string
  }
  export type Output = Omit<UrlEntity, 'id'>
}
