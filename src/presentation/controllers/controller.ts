import { badRequest, serverError } from '@/presentation/helpers'
import { HttpResponse } from '@/presentation/ports'
import { ValidationComposite, IValidator } from '@/presentation/validation'

export abstract class Controller<Request = unknown, Response = unknown > {
  abstract perform (httpRequest: Request): Promise<HttpResponse<Response>>
  buildValidators (httpRequest: Request): IValidator[] {
    return []
  }

  async handleRequest (httpRequest: Request): Promise<HttpResponse<Response | Error>> {
    try {
      const error = this.validateRequest(httpRequest)
      return (error !== undefined)
        ? badRequest(error)
        : await this.perform(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  private validateRequest (httpRequest: Request): Error | undefined {
    const validators = this.buildValidators(httpRequest)
    return new ValidationComposite(validators).validate()
  }
}
