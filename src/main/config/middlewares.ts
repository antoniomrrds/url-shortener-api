import { BODY_PARSER, CONTENT_TYPE, CORS } from '@/main/middlewares'
import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(BODY_PARSER)
  app.use(CORS)
  app.use(CONTENT_TYPE)
}
