import { ValidationComposite, IValidation } from '@/presentation/validation'

class ValidationSpy implements IValidation {
  error?: Error = undefined
  validate (): undefined | Error {
    return this.error
  }
}

type SutTypes = {
  sut: ValidationComposite
  validationSpy: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validations: IValidation[] = []
  const validationSpy1 = new ValidationSpy()
  const validationSpy2 = new ValidationSpy()
  validations.push(validationSpy1, validationSpy2)
  return {
    sut: new ValidationComposite(validations),
    validationSpy: validations
  }
}

describe('ValidationComposite', () => {
  it('Should return undefined if all Validation return undefined', () => {
    const { sut } = makeSut()

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
  it('Should return the first error if more than one Validation fails', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy[0].error = new Error('First_error')
    validationSpy[1].error = new Error('Second_error')

    const error = sut.validate()

    expect(error).toEqual(new Error('First_error'))
  })
  it('Should return an error if any Validation fails', () => {
    const { sut, validationSpy } = makeSut()
    validationSpy[1].error = new Error('Second_error')

    const error = sut.validate()

    expect(error).toEqual(new Error('Second_error'))
  })
})
