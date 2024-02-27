import { UrlValidatorAdapter } from '@/infrastructure/validators'
import { Controller, CreateShortUrlController } from '@/presentation/controllers'
import { RequiredFieldValidation, UrlValidation } from '@/presentation/validation'
import { CreateShortUrlSpy } from '@/tests/application/mocks'
import { mockUrlOutput } from '@/tests/domain/mocks'

type SutTypes = {
  sut: CreateShortUrlController
  createShortUrlSpy: CreateShortUrlSpy
}

const makeSut = (): SutTypes => {
  const createShortUrlSpy = new CreateShortUrlSpy()
  const sut = new CreateShortUrlController(createShortUrlSpy)
  return {
    sut,
    createShortUrlSpy
  }
}

describe('CreateShortUrlController', () => {
  const originalUrl = 'http://any-url.com'

  it('Should extend Controller', () => {
    const { sut } = makeSut()

    expect(sut).toBeInstanceOf(Controller)
  })
  it('Should build Validators correctly', () => {
    const { sut } = makeSut()

    const validators = sut.buildValidators({ originalUrl })

    expect(validators).toEqual([
      new RequiredFieldValidation(originalUrl, 'originalUrl'),
      new UrlValidation(originalUrl, 'originalUrl', new UrlValidatorAdapter())
    ])
  })
  it('Should call CreateShortUrl with the correct value', async () => {
    const { sut, createShortUrlSpy } = makeSut()

    await sut.handleRequest({ originalUrl })

    expect(createShortUrlSpy.input).toEqual({ originalUrl })
    expect(createShortUrlSpy.callsCount).toBe(1)
  })
  it('Should return 201 and the data', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handleRequest({ originalUrl })

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: mockUrlOutput()
    })
  })
})
