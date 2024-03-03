import { PgUrl } from '@/infrastructure/typeorm/entities'
import { app } from '@/main/config'
import { InMemoryDatabase } from '@/tests/infrastructure/typeorm/mocks'
import request from 'supertest'
import { DataSource } from 'typeorm'

describe('Url Routes', () => {
  let connection: DataSource

  beforeAll(async () => {
    connection = await InMemoryDatabase.connect([PgUrl])
    jest.spyOn(DataSource.prototype, 'getRepository').mockReturnValue(connection.getRepository(PgUrl))
  })

  beforeEach(() => {
    InMemoryDatabase.restore()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  describe('POST api/url', () => {
    it('Should return 201 and the data successfully', async () => {
      const { statusCode } = await request(app)
        .post('/api/url')
        .send({ originalUrl: 'https://www.google.com' })

      expect(statusCode).toBe(201)
    })
  })
})
