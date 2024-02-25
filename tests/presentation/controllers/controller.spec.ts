import { Controller } from '@/presentation/controllers'
import { ServerError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/ports'
import { ValidationComposite } from '@/presentation/validation'
import { throwError } from '@/tests/application/mocks'

jest.mock('@/presentation/validation/validation-composite')

class ControllerStub extends Controller {
  output: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.output
  }
}

type SutTypes = {
  sut: ControllerStub
}

const makeSut = (): SutTypes => {
  const sut = new ControllerStub()
  return { sut }
}

describe('Controller', () => {
  const anyValue = 'any_value'

  it('Should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const { sut } = makeSut()
    const validationCompositeSpy = ValidationComposite as jest.Mock
    validationCompositeSpy.mockImplementationOnce(() => ({ validate: () => error }))
    const httpResponse = await sut.handleRequest(anyValue)

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })
  it('Should return 500 if perform throws', async () => {
    const error = new Error('perform_error')
    const { sut } = makeSut()
    sut.perform = throwError

    const httpResponse = await sut.handleRequest(anyValue)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
  it('Should return the same output as the perform method', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handleRequest(anyValue)

    expect(httpResponse).toEqual(sut.output)
  })
})
