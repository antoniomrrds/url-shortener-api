import { DB } from '@/main/config/env'
import { DataSource, DataSourceOptions } from 'typeorm'

const pgDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: DB.host,
  port: Number(DB.port),
  username: DB.username,
  password: DB.password,
  database: DB.database
}

export const dataSourceOptions: DataSourceOptions = {
  ...pgDataSourceOptions,
  entities: [
    `${process.env.TS_NODE_DEV ? 'src' : 'dist'}/infrastructure/typeorm/entities/**/*{.ts,.js}`
  ],
  migrations: [
    `${process.env.TS_NODE_DEV ? 'src' : 'dist'}/typeorm/migrations/**/*{.ts,.js}`
  ],
  synchronize: false

}

export const PgDataSource = new DataSource(dataSourceOptions)
