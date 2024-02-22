import { UniqueIDGeneratorAdapter } from '@/infrastructure/crypto'
import { nanoid } from 'nanoid'

jest.mock('nanoid')

describe('UniqueIdAdapter', () => {
  it('Should call the nanoId method', () => {
    // Arrange
    const sut = new UniqueIDGeneratorAdapter()

    // Act
    sut.generateUniqueId()

    // Assert
    expect(nanoid).toHaveBeenCalledTimes(1)
  })
  it('Should return the unique id', () => {
    // Arrange
    const sut = new UniqueIDGeneratorAdapter()
    const expected = 'any_unique_id'
    const nanoidSpy = nanoid as jest.Mock
    nanoidSpy.mockReturnValueOnce(expected)

    // Act
    const uniqueId = sut.generateUniqueId()

    // Assert
    expect(uniqueId).toBe(expected)
  })
})
