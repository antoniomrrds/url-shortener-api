import { ICreateShortUrlUseCase } from '@/domain/use-cases'
import { CreateShortUrlController } from '@/presentation/controllers'
import { InvalidParamError, ServerError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/presentation/validation'
import { IUrlValidator } from '@/presentation/validation/ports'

jest.mock('@/presentation/validation/required-field-validation')

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

  it('Should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const { sut } = makeSut()
    const requiredFieldValidationSpy = RequiredFieldValidation as jest.Mock
    requiredFieldValidationSpy.mockImplementationOnce(() => ({ validate: () => error }))

    const httpResponse = await sut.handleRequest({ originalUrl })

    expect(requiredFieldValidationSpy).toHaveBeenCalledWith(originalUrl, 'originalUrl')
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
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
  it('Should return 500 if UrlValidator throws', async () => {
    const error = new Error('url_validator_error')
    const { sut, urlValidatorSpy } = makeSut()
    urlValidatorSpy.isValid = () => { throw error }

    const httpResponse = await sut.handleRequest({ originalUrl })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
  it('Should call CreateShortUrl with the correct value', async () => {
    const { sut, createShortUrlSpy } = makeSut()

    await sut.handleRequest({ originalUrl })

    expect(createShortUrlSpy.input).toEqual({ originalUrl })
    expect(createShortUrlSpy.callsCount).toBe(1)
  })
  it('Should return 500 if CreateShortUrl throws', async () => {
    const error = new Error('perform_error')
    const { sut, createShortUrlSpy } = makeSut()
    createShortUrlSpy.perform = () => { throw new Error() }

    const httpResponse = await sut.handleRequest({ originalUrl })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
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
