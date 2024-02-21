import { CreateShortUrl } from '@/application/use-cases'
import { IUniqueIDGenerator } from '@/application/ports/crypto'

class UniqueIDGeneratorStub implements IUniqueIDGenerator {
  output = 'any_unique_id'
  callsCount = 0

  generateUniqueId (): IUniqueIDGenerator.Output {
    this.callsCount++
    return this.output
  }
}

describe('CreateShortURL', () => {
  it('Should call generateUniqueId method of IUniqueIDGenerator when perform is invoked', async () => {
    const uniqueIDGeneratorStub = new UniqueIDGeneratorStub()
    const sut = new CreateShortUrl(uniqueIDGeneratorStub)

    await sut.perform({ url: 'any_url' })

    expect(uniqueIDGeneratorStub.output).toBe('any_unique_id')
    expect(uniqueIDGeneratorStub.callsCount).toBe(1)
  })
  it
})
