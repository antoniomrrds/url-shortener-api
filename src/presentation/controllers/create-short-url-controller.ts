import { ICreateShortUrlUseCase } from '@/domain/use-cases'
import { InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors'
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

  async handleRequest ({ originalUrl }: HttpRequest): Promise<HttpResponse | undefined> {
    try {
      if (originalUrl === undefined || originalUrl === '' || originalUrl === null) {
        return {
          statusCode: 400,
          data: new MissingParamError('originalUrl')
        }
      }
      const isValid = this.urlValidator.isValid(originalUrl)
      if (!isValid) {
        return {
          statusCode: 400,
          data: new InvalidParamError('originalUrl')
        }
      }
      const result = await this.createShortUrl.perform({ originalUrl })
      return {
        statusCode: 201,
        data: result
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: new ServerError()
      }
    }
  }
}
