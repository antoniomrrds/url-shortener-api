import { DataType, newDb, IMemoryDb, IBackup } from 'pg-mem'
import { DataSource } from 'typeorm'

export const InMemoryDatabase = {
  db: null as unknown as IMemoryDb,
  connection: null as unknown as DataSource,
  backup: null as unknown as IBackup,
  async connect (entities?: any[]) {
    this.db = newDb()
    this.db.public.registerFunction({
      implementation: () => 'test',
      name: 'current_database'
    })
    this.db.public.registerFunction({
      implementation: () => 'test',
      name: 'version'
    })
    this.db.public.registerFunction({
      name: 'obj_description',
      returns: DataType.text,
      implementation: () => '',
      args: [DataType.regclass, DataType.text]
    })
    this.connection = await this.db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities,
      logging: false
    })
    await this.initialize()
    await this.sync()
    this.backup = this.db.backup()
    return this.connection
  },
  async initialize () {
    await this.connection.initialize()
  },
  async disconnect () {
    await this.connection.destroy()
  },
  restore () {
    this.backup.restore()
  },
  async sync () {
    await this.connection.synchronize()
  }
}
