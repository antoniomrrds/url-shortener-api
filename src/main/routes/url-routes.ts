import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeCreateShortUrlController } from '@/main/factories/presentation'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/url', adapt(makeCreateShortUrlController()))
}
