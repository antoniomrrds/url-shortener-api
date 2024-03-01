/* eslint-disable @typescript-eslint/unbound-method */
import { Request, Response } from 'express'
import { Controller } from '@/presentation/controllers'

export class ExpressRouteAdapter {
  constructor (private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    const HttpResponse = await this.controller.handleRequest({ ...req.body })
    if (HttpResponse.statusCode === 201) {
      res.status(201).json(HttpResponse.data)
    } else {
      res.status(400).json({ error: HttpResponse.data.message })
    }
  }
}
