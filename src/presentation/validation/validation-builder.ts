import { IValidator, RequiredFieldValidation } from '@/presentation/validation'

type ValidationBuilderType = {
  value: string
  fieldName: string
}

export class ValidationBuilder {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: IValidator[] = []
  ) {}

  static of ({ value, fieldName }: ValidationBuilderType): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required (): this {
    this.validators.push(new RequiredFieldValidation(this.value, this.fieldName))
    return this
  }

  build (): IValidator[] {
    return this.validators
  }
}
