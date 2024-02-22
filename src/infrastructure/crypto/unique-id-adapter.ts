import { IUniqueIDGenerator } from '@/application/ports/crypto'
import { nanoid } from 'nanoid'

export class UniqueIDGeneratorAdapter implements IUniqueIDGenerator {
  generateUniqueId (): IUniqueIDGenerator.Output {
    return nanoid()
  }
}
