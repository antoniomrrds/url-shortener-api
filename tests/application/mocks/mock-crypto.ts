import { IUniqueIDGenerator } from '@/application/ports/crypto'

export class UniqueIDGeneratorStub implements IUniqueIDGenerator {
  output = 'any_unique_id'
  callsCount = 0

  generateUniqueId (): IUniqueIDGenerator.Output {
    this.callsCount++
    return this.output
  }
}
