import { ICreateShortUrlUseCase } from '@/domain/use-cases'
import { created } from '@/presentation/helpers'
import { ValidationBuilder as Builder, IValidation } from '@/presentation/validation'
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
    private readonly createShortUrl: ICreateShortUrlUseCase
  ) {
    super()
  }

  async perform ({ originalUrl }: CreateShortUrlRequest): Promise<HttpResponse<CreateShortUrlResponse>> {
    const result = await this.createShortUrl.perform({ originalUrl })
    return created(result)
  }

  override buildValidators ({ originalUrl }: CreateShortUrlRequest): IValidation[] {
    return [
      ...Builder.of({ value: originalUrl, fieldName: 'originalUrl' }).required().url().build()
    ]
  }
}
