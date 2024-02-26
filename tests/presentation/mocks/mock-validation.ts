import { IValidation } from '@/presentation/validation'

export class ValidationSpy implements IValidation {
  error?: Error = undefined
  validate (): undefined | Error {
    return this.error
  }
}
