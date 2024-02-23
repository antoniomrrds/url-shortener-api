import { CreateShortUrl } from '@/application/use-cases'
import { IUniqueIDGenerator } from '@/application/ports/crypto'
import { ICreateShortUrlRepository } from '@/application/ports/repositories'

class UniqueIDGeneratorStub implements IUniqueIDGenerator {
  output = 'any_unique_id'
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
  createShortUrlRepositorySpy: CreateShortUrlRepositorySpy
}

const makeSut = (): SutTypes => {
  const createShortUrlRepositorySpy = new CreateShortUrlRepositorySpy()
  const uniqueIDGeneratorStub = new UniqueIDGeneratorStub()
  const sut = new CreateShortUrl(uniqueIDGeneratorStub, createShortUrlRepositorySpy)
  return { sut, uniqueIDGeneratorStub, createShortUrlRepositorySpy }
}

describe('CreateShortURL UseCase', () => {
  const url = 'any_url'
  const shortUrl = 'any_unique_id'

  it('Should call generateUniqueId method of IUniqueIDGenerator when perform is invoked', async () => {
    const { sut, uniqueIDGeneratorStub } = makeSut()

    await sut.perform({ url })

    expect(uniqueIDGeneratorStub.output).toBe(shortUrl)
    expect(uniqueIDGeneratorStub.callsCount).toBe(1)
  })
  it('Should call create method of ICreateShortUrlRepository with correct values', async () => {
    const { sut, createShortUrlRepositorySpy } = makeSut()

    await sut.perform({ url })

    expect(createShortUrlRepositorySpy.input).toEqual({
      shortUrl,
      originalUrl: url,
      accessCounter: 0
    })
    expect(createShortUrlRepositorySpy.callsCount).toBe(1)
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
  it('Should rethrow if IUniqueIDGenerator throws', async () => {
    const { sut, uniqueIDGeneratorStub } = makeSut()
    const error = new Error('unique_id_error')
    jest.spyOn(uniqueIDGeneratorStub, 'generateUniqueId')
      .mockImplementationOnce(() => { throw error })

    const promise = sut.perform({ url })

    await expect(promise).rejects.toThrow(error)
  })
  it('Should rethrow if ICreateShortUrlRepository throws', async () => {
    const { sut, createShortUrlRepositorySpy } = makeSut()
    const error = new Error('create_error')
    jest.spyOn(createShortUrlRepositorySpy, 'create')
      .mockImplementationOnce(() => { throw error })

    const promise = sut.perform({ url })

    await expect(promise).rejects.toThrow(error)
  })
})
