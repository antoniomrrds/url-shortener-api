import { IUrlValidator } from '@/presentation/validation'
import { isURL } from 'validator'

export class UrlValidatorAdapter implements IUrlValidator {
  isValid (url: string): boolean {
    try {
      return isURL(url)
    } catch {
      return false
    }
  }
}
