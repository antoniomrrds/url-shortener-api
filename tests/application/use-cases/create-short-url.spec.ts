import { CreateShortUrl } from '@/application/use-cases'
import { mockUrlOutput } from '@/tests/domain/mocks'
import { CreateShortUrlRepositorySpy, UniqueIDGeneratorStub } from '@/tests/application/mocks'

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
    const error = new Error('unique_id_error')
    jest.spyOn(uniqueIDGeneratorStub, 'generateUniqueId')
      .mockImplementationOnce(() => { throw error })

    const promise = sut.perform({ originalUrl })

    await expect(promise).rejects.toThrow(error)
  })
  it('Should rethrow if ICreateShortUrlRepository throws', async () => {
    const { sut, createShortUrlRepositorySpy } = makeSut()
    const error = new Error('create_error')
    jest.spyOn(createShortUrlRepositorySpy, 'create')
      .mockImplementationOnce(() => { throw error })

    const promise = sut.perform({ originalUrl })

    await expect(promise).rejects.toThrow(error)
  })
})
