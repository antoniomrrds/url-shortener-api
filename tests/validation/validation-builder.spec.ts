import { RequiredFieldValidation, ValidationBuilder } from '@/presentation/validation'

describe('ValidationBuilder', () => {
  it('Should return a RequiredFieldValidation', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .required()
      .build()

    expect(validators).toEqual([new RequiredFieldValidation('any_value', 'any_name')])
  })
})
