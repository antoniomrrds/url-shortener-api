import { NextFunction, Request, Response } from 'express'

export const CONTENT_TYPE = (req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}
