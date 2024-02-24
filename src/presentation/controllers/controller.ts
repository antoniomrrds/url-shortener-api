import { badRequest, serverError } from '@/presentation/helpers'
import { HttpResponse } from '@/presentation/ports'
import { ValidationComposite, IValidator } from '@/presentation/validation'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>
  buildValidators (httpRequest: any): IValidator[] {
    return []
  }

  async handleRequest (httpRequest: any): Promise<HttpResponse> {
    try {
      const error = this.validateRequest(httpRequest)
      return (error !== undefined)
        ? badRequest(error)
        : await this.perform(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }

  private validateRequest (httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest)
    return new ValidationComposite(validators).validate()
  }
}
