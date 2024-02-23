import { ICreateShortUrlUseCase } from '@/domain/use-cases'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, created, serverError } from '@/presentation/helpers'
import { HttpResponse } from '@/presentation/ports'
import { IUrlValidator } from '@/presentation/validation/ports'

type HttpRequest = {
  originalUrl: string
}

export class CreateShortUrlController {
  constructor (
    private readonly urlValidator: IUrlValidator,
    private readonly createShortUrl: ICreateShortUrlUseCase
  ) {}

  async handleRequest ({ originalUrl }: HttpRequest): Promise<HttpResponse> {
    try {
      if (originalUrl === undefined || originalUrl === '' || originalUrl === null) {
        return badRequest(new MissingParamError('originalUrl'))
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
}
