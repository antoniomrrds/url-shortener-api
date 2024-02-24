/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/presentation/validation'

describe('RequiredFieldValidation', () => {
  const testCases = [
    { name: 'empty', expected: '' },
    { name: 'null', expected: null },
    { name: 'undefined', expected: undefined }
  ]

  it.each(testCases)('Should return MissingParamError if value is $name', ({ expected }) => {
    const sut = new RequiredFieldValidation(expected as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new MissingParamError('any_field'))
  })
})
