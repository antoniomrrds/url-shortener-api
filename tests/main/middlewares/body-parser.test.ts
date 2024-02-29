import request from 'supertest'

import { app } from '@/main/config'

describe('Body Parser Middleware', () => {
  it('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    const { body } = await request(app)
      .post('/test_body_parser')
      .send({ name: 'any_name' })

    expect(body).toEqual({ name: 'any_name' })
  })
})
