import { MissingParamError } from '@/presentation/errors'
import { IValidator } from '@/presentation/validation'

export class RequiredFieldValidation implements IValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if ([undefined, null, ''].includes(this.value) || this.value.trim() === '') {
      return new MissingParamError(this.fieldName)
    }
  }
}
