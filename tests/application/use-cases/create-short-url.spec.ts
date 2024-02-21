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

class CreateShortUrlRepositorySpy implements ICreateShortUrlRepository {
  input?: ICreateShortUrlRepository.Input
  callsCount = 0
  output = {
    id: 'any_id',
    shortUrl: 'any_unique_id',
    originalUrl: 'any_url',
    accessCounter: 0
  }

  async create (input: ICreateShortUrlRepository.Input): Promise<ICreateShortUrlRepository.Output> {
    this.callsCount++
    this.input = input
    return this.output
  }
}

type SutTypes = {
  sut: CreateShortUrl
  uniqueIDGeneratorStub: UniqueIDGeneratorStub
  createShortUrlRepositoryMock: CreateShortUrlRepositorySpy
}

const makeSut = (): SutTypes => {
  const createShortUrlRepositoryMock = new CreateShortUrlRepositorySpy()
  const uniqueIDGeneratorStub = new UniqueIDGeneratorStub()
  const sut = new CreateShortUrl(uniqueIDGeneratorStub, createShortUrlRepositoryMock)
  return { sut, uniqueIDGeneratorStub, createShortUrlRepositoryMock }
}

describe('CreateShortURL', () => {
  const url = 'any_url'
  const shortUrl = 'any_unique_id'

  it('Should call generateUniqueId method of IUniqueIDGenerator when perform is invoked', async () => {
    const { sut, uniqueIDGeneratorStub } = makeSut()

    await sut.perform({ url })

    expect(uniqueIDGeneratorStub.output).toBe(shortUrl)
    expect(uniqueIDGeneratorStub.callsCount).toBe(1)
  })
  it('Should call create method of ICreateShortUrlRepository with correct values', async () => {
    const { sut, createShortUrlRepositoryMock } = makeSut()

    await sut.perform({ url })

    expect(createShortUrlRepositoryMock.input).toEqual({
      shortUrl,
      originalUrl: url,
      accessCounter: 0
    })
    expect(createShortUrlRepositoryMock.callsCount).toBe(1)
  })
  it('Should return data successfully', async () => {
    const { sut } = makeSut()

    const data = await sut.perform({ url })

    expect(data).toEqual({
      id: 'any_id',
      shortUrl,
      originalUrl: url,
      accessCounter: 0
    })
  })
})
