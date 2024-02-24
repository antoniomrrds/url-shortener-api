import { ICreateShortUrlUseCase } from '@/domain/use-cases'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, created, serverError } from '@/presentation/helpers'
import { IUrlValidator, RequiredFieldValidation } from '@/presentation/validation'
import { HttpResponse } from '@/presentation/ports'

type CreateShortUrlRequest = {
  originalUrl: string
}

type CreateShortUrlResponse = {
  id: string
  shortUrl: string
  originalUrl: string
  accessCounter: number
} | Error

export class CreateShortUrlController {
  constructor (
    private readonly urlValidator: IUrlValidator,
    private readonly createShortUrl: ICreateShortUrlUseCase
  ) {}

  async handleRequest ({ originalUrl }: CreateShortUrlRequest): Promise<HttpResponse<CreateShortUrlResponse>> {
    try {
      const error = this.validateRequest({ originalUrl })
      if (error !== undefined) {
        return badRequest(error)
      }

      const isValid = this.urlValidator.isValid(originalUrl)
      if (!isValid) {
        return badRequest(new InvalidParamError('originalUrl'))
      }
      const result = await this.createShortUrl.perform({ originalUrl })
      return created(result)
    } catch (error) {
      return serverError(error)
    }
  }

  private validateRequest ({ originalUrl }: CreateShortUrlRequest): Error | undefined {
    const validator = new RequiredFieldValidation(originalUrl, 'originalUrl')
    return validator.validate()
  }
}
