import { UniqueIDAdapter } from '@/infrastructure/crypto'
import { nanoid } from 'nanoid'

jest.mock('nanoid')

describe('UniqueIdAdapter', () => {
  it('Should call the nanoid method', () => {
    // Arrange
    const sut = new UniqueIDAdapter()

    // Act
    sut.generateUniqueId()

    // Assert
    expect(nanoid).toHaveBeenCalledTimes(1)
  })
})
