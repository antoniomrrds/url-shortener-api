/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/unbound-method */
import { getMockReq, getMockRes } from '@jest-mock/express'
import { ControllerStub } from '@/tests/presentation/mocks'
import { adaptExpressRoute } from '@/main/adapters'

import { NextFunction, Request, RequestHandler, Response } from 'express'

jest.mock('@/tests/presentation/mocks')

type SutTypes = {
  sut: RequestHandler
  req: Request
  res: Response
  next: NextFunction
  controllerSpy: jest.Mocked<ControllerStub>
}

const anyData = 'any_data'
const error = 'any_error'

const makeSut = (): SutTypes => {
  const req = getMockReq({ body: { anyData } })
  const { res, next } = getMockRes()
  const controllerSpy = new ControllerStub() as jest.Mocked<ControllerStub>
  controllerSpy.handleRequest.mockResolvedValue({ statusCode: 201, data: { anyData } })
  const sut = adaptExpressRoute(controllerSpy)

  return { sut, req, res, next, controllerSpy }
}

describe('ExpressRouteAdapter', () => {
  it('Should call handleRequest with correct request', async () => {
    const { sut, req, res, next, controllerSpy } = makeSut()

    await sut(req, res, next)

    expect(controllerSpy.handleRequest).toHaveBeenCalledWith({ anyData })
    expect(controllerSpy.handleRequest).toHaveBeenCalledTimes(1)
  })
  it('Should call handleRequest with empty request', async () => {
    const { sut, res, next, controllerSpy } = makeSut()
    const req = getMockReq()

    await sut(req, res, next)

    expect(controllerSpy.handleRequest).toHaveBeenCalledWith({})
    expect(controllerSpy.handleRequest).toHaveBeenCalledTimes(1)
  })
  it('Should respond with 201 and the correctly data', async () => {
    const { sut, req, res, next } = makeSut()

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ anyData })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
  it('Should respond with 400 and the correctly error', async () => {
    const { sut, req, res, next, controllerSpy } = makeSut()

    controllerSpy.handleRequest.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('any_error')
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
  it('Should respond with 500 and the correctly error', async () => {
    const { sut, req, res, next, controllerSpy } = makeSut()
    controllerSpy.handleRequest.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any_error')
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
