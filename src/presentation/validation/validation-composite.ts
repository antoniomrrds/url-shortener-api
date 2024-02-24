import { IValidator } from '@/presentation/validation/ports'

export class ValidationComposite implements IValidator {
  constructor (private readonly validators: IValidator[]) {}

  validate (): Error | undefined {
    return this.validators
      .map(validator => validator.validate())
      .find(Boolean)
  }
}
