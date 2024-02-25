import { ICreateShortUrlUseCase } from '@/domain/use-cases'

export const mockUrlOutput = (): ICreateShortUrlUseCase.Output => ({
  id: 'any_id',
  originalUrl: 'any_url',
  shortUrl: 'any_unique_id',
  accessCounter: 0
})
