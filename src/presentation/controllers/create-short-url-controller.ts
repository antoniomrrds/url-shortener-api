import { ICreateShortUrlUseCase } from '@/domain/use-cases'
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
          data: new Error('The field originalUrl is required.')
        }
      }
      const isValid = this.urlValidator.isValid(originalUrl)
      if (!isValid) {
        return {
          statusCode: 400,
          data: new Error('The field originalUrl must be a valid URL.')
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
        data: new Error()
      }
    }
  }
}
