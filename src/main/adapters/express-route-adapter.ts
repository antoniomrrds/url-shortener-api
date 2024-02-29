/* eslint-disable @typescript-eslint/unbound-method */
import { Request, Response } from 'express'
import { Controller } from '@/presentation/controllers'

export class ExpressRouteAdapter {
  constructor (private readonly controller: Controller) {}
  async adapt (req: Request, res: Response): Promise<void> {
    this.controller.handleRequest({ ...req.body })
  }
}
