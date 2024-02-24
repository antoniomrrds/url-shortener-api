import { ValidationComposite, IValidator } from '@/presentation/validation'

class ValidatorSpy implements IValidator {
  error?: Error
  validate (): undefined | Error {
    return this.error
  }
}

type SutTypes = {
  sut: ValidationComposite
  validatorSpy: IValidator[] }

const makeSut = (): SutTypes => {
  const validators: IValidator[] = []
  const validatorSpy1 = new ValidatorSpy()
  const validatorSpy2 = new ValidatorSpy()
  validators.push(validatorSpy1, validatorSpy2)
  return {
    sut: new ValidationComposite(validators),
    validatorSpy: validators
  }
}

describe('ValidationComposite', () => {
  it('Should return undefined if all Validators return undefined', () => {
    const { sut } = makeSut()

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
