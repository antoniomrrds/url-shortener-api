import { ValidationComposite, IValidation } from '@/presentation/validation'

class ValidatorSpy implements IValidation {
  error?: Error = undefined
  validate (): undefined | Error {
    return this.error
  }
}

type SutTypes = {
  sut: ValidationComposite
  validatorSpy: ValidatorSpy[]
}

const makeSut = (): SutTypes => {
  const validators: IValidation[] = []
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

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
  it('Should return the first error if more than one Validator fails', () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy[0].error = new Error('First_error')
    validatorSpy[1].error = new Error('Second_error')

    const error = sut.validate()

    expect(error).toEqual(new Error('First_error'))
  })
  it('Should return an error if any Validator fails', () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy[1].error = new Error('Second_error')

    const error = sut.validate()

    expect(error).toEqual(new Error('Second_error'))
  })
})
