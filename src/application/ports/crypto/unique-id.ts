export interface IUniqueIDGenerator {
  generateUniqueId: () => IUniqueIDGenerator.Output
}

export namespace IUniqueIDGenerator {
  export type Output = string
}
