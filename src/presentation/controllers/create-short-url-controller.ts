import { ICreateShortUrlUseCase } from '@/domain/use-cases'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, created } from '@/presentation/helpers'
import { IUrlValidator, ValidationBuilder as Builder, IValidation } from '@/presentation/validation'
import { HttpResponse } from '@/presentation/ports'
import { Controller } from '@/presentation/controllers'

type CreateShortUrlRequest = {
  originalUrl: string
}

type CreateShortUrlResponse = {
  id: string
  shortUrl: string
  originalUrl: string
  accessCounter: number
} | Error

export class CreateShortUrlController extends Controller<CreateShortUrlRequest, CreateShortUrlResponse> {
  constructor (
    private readonly urlValidator: IUrlValidator,
    private readonly createShortUrl: ICreateShortUrlUseCase
  ) {
    super()
  }

  async perform ({ originalUrl }: CreateShortUrlRequest): Promise<HttpResponse<CreateShortUrlResponse>> {
    const isValid = this.urlValidator.isValid(originalUrl)
    if (!isValid) {
      return badRequest(new InvalidParamError('originalUrl'))
    }
    const result = await this.createShortUrl.perform({ originalUrl })
    return created(result)
  }

  override buildValidators ({ originalUrl }: CreateShortUrlRequest): IValidation[] {
    return [
      ...Builder.of({ value: originalUrl, fieldName: 'originalUrl' }).required().build()
    ]
  }
}
