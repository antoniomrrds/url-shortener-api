import { UniqueIDGeneratorAdapter } from '@/infrastructure/crypto'
import { nanoid } from 'nanoid'

jest.mock('nanoid')

const makeSut = (): UniqueIDGeneratorAdapter => {
  return new UniqueIDGeneratorAdapter()
}

describe('UniqueIdAdapter', () => {
  it('Should call the nanoId method', () => {
    const sut = makeSut()

    sut.generateUniqueId()

    expect(nanoid).toHaveBeenCalledTimes(1)
  })
  it('Should return the unique id', () => {
    const sut = makeSut()
    const expected = 'any_unique_id'
    const nanoidSpy = nanoid as jest.Mock
    nanoidSpy.mockReturnValueOnce(expected)

    const uniqueId = sut.generateUniqueId()

    expect(uniqueId).toBe(expected)
  })
})
