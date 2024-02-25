import { UrlValidatorAdapter } from '@/infrastructure/validators'
import validator from 'validator'

jest.mock('validator')

const makeSut = (): UrlValidatorAdapter => {
  return new UrlValidatorAdapter()
}

describe('UrlValidatorAdapter', () => {
  let isValidatorSpy: jest.Mocked<typeof validator>

  beforeAll(() => {
    isValidatorSpy = validator as jest.Mocked<typeof validator>
    isValidatorSpy.isURL.mockReturnValue(true)
  })

  it('Should return false if validator returns false', () => {
    isValidatorSpy.isURL.mockReturnValueOnce(false)
    const sut = makeSut()

    const isValid = sut.isValid('invalid_url')

    expect(isValid).toBe(false)
  })
  it('Should return true if validator returns true', () => {
    const sut = makeSut()

    const isValid = sut.isValid('valid_url')

    expect(isValid).toBe(true)
  })
  it('Should call validator with correct value', () => {
    const sut = makeSut()

    sut.isValid('any_url')

    expect(isValidatorSpy.isURL).toHaveBeenCalledWith('any_url')
  })
})
