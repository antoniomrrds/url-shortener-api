import { UrlValidatorAdapter } from '@/infrastructure/validators'

describe('UrlValidatorAdapter', () => {
  const testCases = [
    { name: 'false', expected: false, value: 'invalid_url' }
  ]

  it.each(testCases)('Should return $name if validator returns $name', ({ expected, value }) => {
    const sut = new UrlValidatorAdapter()

    const isValid = sut.isValid(value)

    expect(isValid).toBe(expected)
  })
})
