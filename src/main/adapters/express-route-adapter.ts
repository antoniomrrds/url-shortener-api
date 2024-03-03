import { RequestHandler } from 'express'
import { Controller } from '@/presentation/controllers'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req, res) => {
  const { statusCode, data } = await controller.handleRequest({ ...req.body })
  const json = statusCode === 201 ? data : { error: data.message }
  res.status(statusCode).json(json)
}
