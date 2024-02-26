import { InvalidParamError } from '@/presentation/errors'
import { UrlValidation } from '@/presentation/validation'
import { UrlValidatorSpy } from '@/tests/infrastructure/mocks'

type SutTypes = {
  sut: UrlValidation
  urlValidatorSpy: UrlValidatorSpy
}

const makeSut = (): SutTypes => {
  const urlValidatorSpy = new UrlValidatorSpy()
  const sut = new UrlValidation('any_value', 'any_field', urlValidatorSpy)
  return {
    sut,
    urlValidatorSpy
  }
}

describe('UrlValidation', () => {
  it('Should call urlValidator with the correct value', () => {
    const { sut, urlValidatorSpy } = makeSut()

    sut.validate()

    expect(urlValidatorSpy.input).toBe('any_value')
    expect(urlValidatorSpy.callsCount).toBe(1)
  })
  it('Should return InvalidParamError if urlValidator returns false', () => {
    const { sut, urlValidatorSpy } = makeSut()
    urlValidatorSpy.output = false

    const error = sut.validate()

    expect(error).toEqual(new InvalidParamError('any_field'))
  })
})
