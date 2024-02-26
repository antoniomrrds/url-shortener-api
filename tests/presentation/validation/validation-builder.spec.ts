import { UrlValidatorAdapter } from '@/infrastructure/validators'
import { RequiredFieldValidation, UrlValidation, ValidationBuilder } from '@/presentation/validation'
import { UrlValidatorSpy } from '@/tests/infrastructure/mocks'

jest.mock('@/infrastructure/validators/url-validator-adapter')

describe('ValidationBuilder', () => {
  it('Should return a RequiredFieldValidation', () => {
    const validations = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .required()
      .build()

    expect(validations).toEqual([new RequiredFieldValidation('any_value', 'any_name')])
  })
  it('Should return a UrlValidation', () => {
    const urlValidatorSpy = UrlValidatorAdapter as jest.MockedClass<typeof UrlValidatorAdapter>
    urlValidatorSpy.mockImplementation(() => new UrlValidatorSpy())

    const validations = ValidationBuilder
      .of({ value: 'any_value', fieldName: 'any_name' })
      .url()
      .build()

    expect(validations).toEqual([
      new UrlValidation('any_value', 'any_name', new UrlValidatorSpy())
    ])
    expect(urlValidatorSpy).toHaveBeenCalledTimes(1)
  })
})
