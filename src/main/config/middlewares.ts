import { BODYPARSER, CORS } from '@/main/middlewares'
import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(BODYPARSER)
  app.use(CORS)
}
