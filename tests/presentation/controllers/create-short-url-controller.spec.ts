import { ICreateShortUrlUseCase } from '@/domain/use-cases'
import { Controller, CreateShortUrlController } from '@/presentation/controllers'
import { InvalidParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/presentation/validation'
import { IUrlValidator } from '@/presentation/validation/ports'

class UrlValidatorSpy implements IUrlValidator {
  output: boolean = true
  input?: string
  callsCount = 0

  isValid (url: string): boolean {
    this.input = url
    this.callsCount++
    return this.output
  }
}

class CreateShortUrlSpy implements ICreateShortUrlUseCase {
  input?: ICreateShortUrlUseCase.Input
  callsCount = 0
  output = {
    id: 'any_id',
    shortUrl: 'any_unique_id',
    originalUrl: 'any_url',
    accessCounter: 0
  }

  async perform (input: ICreateShortUrlUseCase.Input): Promise<ICreateShortUrlUseCase.Output > {
    this.input = input
    this.callsCount++
    return this.output
  }
}

type SutTypes = {
  sut: CreateShortUrlController
  urlValidatorSpy: UrlValidatorSpy
  createShortUrlSpy: CreateShortUrlSpy

}

const makeSut = (): SutTypes => {
  const createShortUrlSpy = new CreateShortUrlSpy()
  const urlValidatorSpy = new UrlValidatorSpy()
  const sut = new CreateShortUrlController(urlValidatorSpy, createShortUrlSpy)
  return {
    sut,
    urlValidatorSpy,
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
      new RequiredFieldValidation(originalUrl, 'originalUrl')
    ])
  })
  it('Should return 400 if the originalUrl field is not a URL', async () => {
    const { sut, urlValidatorSpy } = makeSut()
    urlValidatorSpy.output = false

    const httpResponse = await sut.handleRequest({ originalUrl: 'invalid_url' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new InvalidParamError('originalUrl')
    })
  })
  it('Should call UrlValidator with the correct url', async () => {
    const { sut, urlValidatorSpy } = makeSut()

    await sut.handleRequest({ originalUrl })

    expect(urlValidatorSpy.input).toBe(originalUrl)
    expect(urlValidatorSpy.callsCount).toBe(1)
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
      data: {
        id: 'any_id',
        shortUrl: 'any_unique_id',
        originalUrl: 'any_url',
        accessCounter: 0
      }
    })
  })
})
