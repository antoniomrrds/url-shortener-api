import { PgUrlRepository } from '@/infrastructure/repositories'
import { InMemoryDatabase } from '@/tests/infrastructure/typeorm/mocks'

import { PgUrl } from '@/infrastructure/typeorm/entities'
import { DataSource } from 'typeorm'

describe('PgUrlRepository', () => {
  let connection: DataSource

  beforeAll(async () => {
    connection = await InMemoryDatabase.connect([PgUrl])
  })

  beforeEach(() => {
    InMemoryDatabase.restore()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('Should successfully create a short URL', async () => {
    const sut = new PgUrlRepository(connection)

    const createdShortUrl = await sut.create({
      shortUrl: 'any_short_url',
      originalUrl: 'any_original_url',
      accessCounter: 0
    })

    expect(createdShortUrl).toMatchObject({
      id: '1',
      shortUrl: 'any_short_url',
      originalUrl: 'any_original_url',
      accessCounter: 0
    })
  })
})
