import { nanoid } from 'nanoid'

export class UniqueIDAdapter {
  generateUniqueId (): void {
    nanoid()
  }
}
