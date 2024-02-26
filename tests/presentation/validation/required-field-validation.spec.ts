/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/presentation/validation'

describe('RequiredFieldValidation', () => {
  const testCases = [
    { name: 'is empty', expected: '' },
    { name: 'contains space', expected: '  ' },
    { name: 'is null', expected: null },
    { name: 'is undefined', expected: undefined }
  ]

  it.each(testCases)('Should return MissingParamError if value $name', ({ expected }) => {
    const sut = new RequiredFieldValidation(expected as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new MissingParamError('any_field'))
  })
  it('Should return undefined if value is not empty', () => {
    const sut = new RequiredFieldValidation('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
