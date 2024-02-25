import { IUrlValidator } from '@/presentation/validation'

export class UrlValidatorAdapter implements IUrlValidator {
  isValid (url: string): boolean {
    return false
  }
}
