import { Controller } from '@/presentation/controllers'
import { HttpResponse } from '@/presentation/ports'

export class ControllerStub extends Controller {
  output: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.output
  }
}
