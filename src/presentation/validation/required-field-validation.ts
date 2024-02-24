import { MissingParamError } from '@/presentation/errors'

export class RequiredFieldValidation {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error {
    return new MissingParamError(this.fieldName)
  }
}
