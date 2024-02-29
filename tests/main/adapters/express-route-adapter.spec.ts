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
  controllerSpy: ControllerStub
}

const makeSut = (): SutTypes => {
  const req = getMockReq({ body: { anyBody: 'any_body' } })
  const { res } = getMockRes()
  const controllerSpy = new (ControllerStub as jest.MockedClass<typeof ControllerStub>)()

  const sut = new ExpressRouteAdapter(controllerSpy)

  return { sut, req, res, controllerSpy }
}

describe('ExpressRouteAdapter', () => {
  it('Should call handleRequest with correct request', async () => {
    const { sut, req, res, controllerSpy } = makeSut()
    await sut.adapt(req, res)

    expect(controllerSpy.handleRequest).toHaveBeenCalledWith({ anyBody: 'any_body' })
  })
  it('Should call handleRequest with empty request', async () => {
    const { sut, res, controllerSpy } = makeSut()
    const req = getMockReq()

    await sut.adapt(req, res)

    expect(controllerSpy.handleRequest).toHaveBeenCalledWith({})
  })
})
