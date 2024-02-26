import { UrlValidatorAdapter } from '@/infrastructure/validators'
import { IValidation, RequiredFieldValidation, UrlValidation } from '@/presentation/validation'

type ValidationBuilderType = {
  value: string
  fieldName: string
}

export class ValidationBuilder {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validations: IValidation[] = []
  ) {}

  static of ({ value, fieldName }: ValidationBuilderType): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required (): this {
    this.validations.push(new RequiredFieldValidation(this.value, this.fieldName))
    return this
  }

  url (): this {
    this.validations.push(new UrlValidation(this.value, this.fieldName, new UrlValidatorAdapter()))
    return this
  }

  build (): IValidation[] {
    return this.validations
  }
}
