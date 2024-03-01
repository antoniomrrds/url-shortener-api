/* eslint-disable @typescript-eslint/unbound-method */
import { Request, Response } from 'express'
import { Controller } from '@/presentation/controllers'

export class ExpressRouteAdapter {
  constructor (private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    const { statusCode, data } = await this.controller.handleRequest({ ...req.body })
    if (statusCode === 201) {
      res.status(statusCode).json(data)
    } else {
      res.status(statusCode).json({ error: data.message })
    }
  }
}
