import { IUrlValidator } from '@/presentation/validation'

export class UrlValidatorSpy implements IUrlValidator {
  output: boolean = true
  input?: string
  callsCount = 0

  isValid (url: string): boolean {
    this.input = url
    this.callsCount++
    return this.output
  }
}
