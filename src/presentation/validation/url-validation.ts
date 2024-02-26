import { IUrlValidator } from '@/presentation/validation/ports'

export class UrlValidation {
  constructor (
    private readonly value: string,
    private readonly urlValidator: IUrlValidator
  ) {}

  validate (): undefined {
    this.urlValidator.isValid(this.value)
  }
}
