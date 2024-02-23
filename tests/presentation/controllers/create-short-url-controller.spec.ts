import { CreateShortUrlController } from '@/presentation/controllers'
import { IUrlValidator } from '@/presentation/validation/ports'

class UrlValidatorStub implements IUrlValidator {
  output: boolean = true
  input?: string
  callsCount = 0

  isValid (url: string): boolean {
    this.input = url
    this.callsCount++
    return this.output
  }
}

type SutTypes = {
  sut: CreateShortUrlController
  urlValidatorStub: UrlValidatorStub
}

const makeSut = (): SutTypes => {
  const urlValidatorStub = new UrlValidatorStub()
  const sut = new CreateShortUrlController(urlValidatorStub)
  return {
    sut,
    urlValidatorStub
  }
}

describe('CreateShortUrlController', () => {
  it('Should return 400 if originalUrl field is empty', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handleRequest({ originalUrl: '' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field originalUrl is required.')
    })
  })
  it('Should return 400 if originalUrl field is undefined', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handleRequest({ originalUrl: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field originalUrl is required.')
    })
  })
  it('Should return 400 if originalUrl field is null', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handleRequest({ originalUrl: null as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field originalUrl is required.')
    })
  })
  it('Should return 400 if the originalUrl field is not a URL', async () => {
    const { sut, urlValidatorStub } = makeSut()
    urlValidatorStub.output = false

    const httpResponse = await sut.handleRequest({ originalUrl: 'invalid-url' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field originalUrl must be a valid URL.')
    })
  })
  it('Should call UrlValidator with the correct url', async () => {
    const { sut, urlValidatorStub } = makeSut()

    await sut.handleRequest({ originalUrl: 'any-url' })

    expect(urlValidatorStub.input).toBe('any-url')
    expect(urlValidatorStub.callsCount).toBe(1)
  })
  it('Should return 500 if UrlValidator throws', async () => {
    const { sut, urlValidatorStub } = makeSut()
    urlValidatorStub.isValid = () => { throw new Error() }

    const httpResponse = await sut.handleRequest({ originalUrl: 'any-url' })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new Error()
    })
  })
})
