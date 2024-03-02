import { Router } from 'express'

export default (router: Router): void => {
  router.post('/url', (req, res) => {
    res.status(201).json({ ok: true })
  })
}
