import { InvalidParamError } from '@/presentation/errors'
import { IUrlValidator, IValidation } from '@/presentation/validation/ports'

export class UrlValidation implements IValidation {
  constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly urlValidator: IUrlValidator
  ) {}

  validate (): undefined | Error {
    const isValid = this.urlValidator.isValid(this.value)
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
