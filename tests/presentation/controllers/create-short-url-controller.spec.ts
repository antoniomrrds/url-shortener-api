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
})
