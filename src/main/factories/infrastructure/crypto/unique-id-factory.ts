import { UniqueIDGeneratorAdapter } from '@/infrastructure/crypto'

export const makeUniqueID = (): UniqueIDGeneratorAdapter => new UniqueIDGeneratorAdapter()
