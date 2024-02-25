import { IUrlValidator } from '@/presentation/validation'
import { isURL } from 'validator'

export class UrlValidatorAdapter implements IUrlValidator {
  isValid (url: string): boolean {
    return isURL(url)
  }
}
