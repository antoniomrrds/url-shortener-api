import { UrlValidation } from '@/presentation/validation'
import { UrlValidatorSpy } from '@/tests/infrastructure/mocks'

describe('UrlValidation', () => {
  it(' Should call urlValidator with the correct value', () => {
    const urlValidatorSpy = new UrlValidatorSpy()
    const sut = new UrlValidation('any_value', urlValidatorSpy)

    sut.validate()

    expect(urlValidatorSpy.input).toBe('any_value')
    expect(urlValidatorSpy.callsCount).toBe(1)
  })
})
