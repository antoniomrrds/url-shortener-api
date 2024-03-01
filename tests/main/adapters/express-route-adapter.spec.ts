/* eslint-disable @typescript-eslint/unbound-method */
import { getMockReq, getMockRes } from '@jest-mock/express'
import { ControllerStub } from '@/tests/presentation/mocks'
import { ExpressRouteAdapter } from '@/main/adapters'

import { Request, Response } from 'express'

jest.mock('@/tests/presentation/mocks')

type SutTypes = {
  sut: ExpressRouteAdapter
  req: Request
  res: Response
  controllerSpy: jest.Mocked<ControllerStub>
}

const makeSut = (): SutTypes => {
  const req = getMockReq({ body: { anyData: 'any_data' } })
  const { res } = getMockRes()
  const controllerSpy = new ControllerStub() as jest.Mocked<ControllerStub>
  controllerSpy.handleRequest.mockResolvedValue({ statusCode: 201, data: { anyData: 'any_data' } })
  const sut = new ExpressRouteAdapter(controllerSpy)

  return { sut, req, res, controllerSpy }
}

describe('ExpressRouteAdapter', () => {
  it('Should call handleRequest with correct request', async () => {
    const { sut, req, res, controllerSpy } = makeSut()
    await sut.adapt(req, res)

    expect(controllerSpy.handleRequest).toHaveBeenCalledWith({ anyData: 'any_data' })
    expect(controllerSpy.handleRequest).toHaveBeenCalledTimes(1)
  })
  it('Should call handleRequest with empty request', async () => {
    const { sut, res, controllerSpy } = makeSut()
    const req = getMockReq()

    await sut.adapt(req, res)

    expect(controllerSpy.handleRequest).toHaveBeenCalledWith({})
    expect(controllerSpy.handleRequest).toHaveBeenCalledTimes(1)
  })
  it('Should respond with 201 and the correctly data', async () => {
    const { sut, req, res } = makeSut()

    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ anyData: 'any_data' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
  it('Should respond with 400 and the correctly error', async () => {
    const { sut, req, res, controllerSpy } = makeSut()
    controllerSpy.handleRequest.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('any_error')
    })

    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
  it('Should respond with 500 and the correctly error', async () => {
    const { sut, req, res, controllerSpy } = makeSut()
    controllerSpy.handleRequest.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any_error')
    })

    await sut.adapt(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
