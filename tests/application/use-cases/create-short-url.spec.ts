import { CreateShortUrl } from '@/application/use-cases'
import { mockUrlOutput } from '@/tests/domain/mocks'
import { CreateShortUrlRepositorySpy, UniqueIDGeneratorStub, throwError } from '@/tests/application/mocks'

type SutTypes = {
  sut: CreateShortUrl
  uniqueIDGeneratorStub: UniqueIDGeneratorStub
  createShortUrlRepositorySpy: CreateShortUrlRepositorySpy
}

const makeSut = (): SutTypes => {
  const createShortUrlRepositorySpy = new CreateShortUrlRepositorySpy()
  const uniqueIDGeneratorStub = new UniqueIDGeneratorStub()
  const sut = new CreateShortUrl(uniqueIDGeneratorStub, createShortUrlRepositorySpy)
  return {
    sut,
    uniqueIDGeneratorStub,
    createShortUrlRepositorySpy
  }
}

describe('CreateShortURL UseCase', () => {
  const originalUrl = 'any_url'
  const shortUrl = 'any_unique_id'

  it('Should call generateUniqueId method of IUniqueIDGenerator when perform is invoked', async () => {
    const { sut, uniqueIDGeneratorStub } = makeSut()

    await sut.perform({ originalUrl })

    expect(uniqueIDGeneratorStub.output).toBe(shortUrl)
    expect(uniqueIDGeneratorStub.callsCount).toBe(1)
  })
  it('Should call create method of ICreateShortUrlRepository with correct values', async () => {
    const { sut, createShortUrlRepositorySpy } = makeSut()

    await sut.perform({ originalUrl })

    expect(createShortUrlRepositorySpy.input).toEqual({
      shortUrl,
      originalUrl,
      accessCounter: 0
    })
    expect(createShortUrlRepositorySpy.callsCount).toBe(1)
  })
  it('Should return data successfully', async () => {
    const { sut } = makeSut()

    const data = await sut.perform({ originalUrl })

    expect(data).toEqual(mockUrlOutput())
  })
  it('Should rethrow if IUniqueIDGenerator throws', async () => {
    const { sut, uniqueIDGeneratorStub } = makeSut()
    uniqueIDGeneratorStub.generateUniqueId = throwError

    const promise = sut.perform({ originalUrl })

    await expect(promise).rejects.toThrow()
  })
  it('Should rethrow if ICreateShortUrlRepository throws', async () => {
    const { sut, createShortUrlRepositorySpy } = makeSut()
    createShortUrlRepositorySpy.create = throwError

    const promise = sut.perform({ originalUrl })

    await expect(promise).rejects.toThrow()
  })
})
