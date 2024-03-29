import { badRequest, serverError } from '@/presentation/helpers'
import { HttpResponse } from '@/presentation/ports'
import { ValidationComposite, IValidation } from '@/presentation/validation'

export abstract class Controller<Request = any, Response = any > {
  abstract perform (httpRequest: Request): Promise<HttpResponse<Response>>
  buildValidators (httpRequest: Request): IValidation[] {
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
