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
    'dist/infrastructure/repositories/postgres/entities/**/*{.ts,.js}'
  ],
  synchronize: true
}

export const PgDataSource = new DataSource(dataSourceOptions)
