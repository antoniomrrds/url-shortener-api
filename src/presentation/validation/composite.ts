import { IValidator } from '@/presentation/validation/ports'

export class ValidationComposite {
  constructor (private readonly validators: IValidator[]) {}

  validate (): undefined {
    return undefined
  }
}
