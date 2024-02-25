import { ICreateShortUrlRepository } from '@/application/ports/repositories'

export const mockUrlRepositoryOutput = (): ICreateShortUrlRepository.Output => ({
  id: '1',
  shortUrl: 'any_short_url',
  originalUrl: 'any_original_url',
  accessCounter: 0
})

export const mockUrlRepositoryInput = (): ICreateShortUrlRepository.Input => ({
  shortUrl: 'any_short_url',
  originalUrl: 'any_original_url',
  accessCounter: 0
})
