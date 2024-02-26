import { IValidation } from '@/presentation/validation/ports'

export class ValidationComposite implements IValidation {
  constructor (private readonly validators: IValidation[]) {}

  validate (): Error | undefined {
    return this.validators
      .map(validator => validator.validate())
      .find(Boolean)
  }
}
