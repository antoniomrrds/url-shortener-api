import { app } from '@/main/config'
import request from 'supertest'

describe('Url Routes', () => {
  describe('POST api/url', () => {
    it('Should return 201 and the data successfully', async () => {
      const { statusCode } = await request(app)
        .post('/api/url')
        .send({ url: 'http://www.google.com' })

      expect(statusCode).toBe(201)
    })
  })
})
