import { CreateShortUrlController } from '@/presentation/controllers'

describe('CreateShortUrlController', () => {
  it('Should return 400 if originalUrl field is empty', async () => {
    const sut = new CreateShortUrlController()

    const httpResponse = await sut.handleRequest({ originalUrl: '' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field originalUrl is required.')
    })
  })
  it('Should return 400 if originalUrl field is undefined', async () => {
    const sut = new CreateShortUrlController()

    const httpResponse = await sut.handleRequest({ originalUrl: undefined })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field originalUrl is required.')
    })
  })
  it('Should return 400 if originalUrl field is null', async () => {
    const sut = new CreateShortUrlController()

    const httpResponse = await sut.handleRequest({ originalUrl: null })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field originalUrl is required.')
    })
  })
})
