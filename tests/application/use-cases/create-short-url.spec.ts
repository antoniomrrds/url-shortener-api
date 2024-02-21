import { CreateShortUrl } from '@/application/use-cases'
import { IUniqueIDGenerator } from '@/application/ports/crypto'
import { ICreateShortUrlRepository } from '@/application/ports/repositories'

class UniqueIDGeneratorStub implements IUniqueIDGenerator {
  public output = 'any_unique_id'
  callsCount = 0

  generateUniqueId (): IUniqueIDGenerator.Output {
    this.callsCount++
    return this.output
  }
}

class CreateShortUrlRepositoryMock implements ICreateShortUrlRepository {
  input?: ICreateShortUrlRepository.Input
  callsCount = 0

  async create (input: ICreateShortUrlRepository.Input): Promise<void> {
    this.callsCount++
    this.input = input
  }
}

type SutTypes = {
  sut: CreateShortUrl
  uniqueIDGeneratorStub: UniqueIDGeneratorStub
  createShortUrlRepositoryMock: CreateShortUrlRepositoryMock
}

const makeSut = (): SutTypes => {
  const createShortUrlRepositoryMock = new CreateShortUrlRepositoryMock()
  const uniqueIDGeneratorStub = new UniqueIDGeneratorStub()
  const sut = new CreateShortUrl(uniqueIDGeneratorStub, createShortUrlRepositoryMock)
  return { sut, uniqueIDGeneratorStub, createShortUrlRepositoryMock }
}

describe('CreateShortURL', () => {
  const url = 'any_url'

  it('Should call generateUniqueId method of IUniqueIDGenerator when perform is invoked', async () => {
    const { sut, uniqueIDGeneratorStub } = makeSut()

    await sut.perform({ url })

    expect(uniqueIDGeneratorStub.output).toBe('any_unique_id')
    expect(uniqueIDGeneratorStub.callsCount).toBe(1)
  })
  it('Should call create method of ICreateShortUrlRepository with correct values', async () => {
    const { sut, createShortUrlRepositoryMock } = makeSut()

    await sut.perform({ url })

    expect(createShortUrlRepositoryMock.input).toEqual({
      shortUrl: 'any_unique_id',
      originalUrl: url,
      accessCounter: 0
    })
    expect(createShortUrlRepositoryMock.callsCount).toBe(1)
  })
})
