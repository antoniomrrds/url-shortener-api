import { HttpResponse } from '@/presentation/ports'

export class CreateShortUrlController {
  async handleRequest (httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      data: new Error('The field originalUrl is required.')
    }
  }
}
