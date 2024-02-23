import { CreateShortUrlController } from '@/presentation/controllers'

const makeSut = (): CreateShortUrlController => {
  return new CreateShortUrlController()
}

describe('CreateShortUrlController', () => {
  it('Should return 400 if originalUrl field is empty', async () => {
    const sut = makeSut()

    const httpResponse = await sut.handleRequest({ originalUrl: '' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field originalUrl is required.')
    })
  })
  it('Should return 400 if originalUrl field is undefined', async () => {
    const sut = makeSut()

    const httpResponse = await sut.handleRequest({ originalUrl: undefined })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field originalUrl is required.')
    })
  })
  it('Should return 400 if originalUrl field is null', async () => {
    const sut = makeSut()

    const httpResponse = await sut.handleRequest({ originalUrl: null })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field originalUrl is required.')
    })
  })
})
