import { ServerError } from '@/presentation/errors'
import { ValidationComposite } from '@/presentation/validation'
import { throwError } from '@/tests/application/mocks'
import { ControllerStub } from '@/tests/presentation/mocks'

jest.mock('@/presentation/validation/validation-composite')

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
