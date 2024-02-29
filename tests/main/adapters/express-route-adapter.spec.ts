/* eslint-disable @typescript-eslint/unbound-method */
import { getMockReq, getMockRes } from '@jest-mock/express'
import { ControllerStub } from '@/tests/presentation/mocks'
import { ExpressRouteAdapter } from '@/main/adapters'

jest.mock('@/tests/presentation/mocks')

describe('ExpressRouteAdapter', () => {
  it('Should call handleRequest with correct request', async () => {
    const req = getMockReq({ body: { anyBody: 'any_body' } })
    const { res } = getMockRes()
    const controllerSpy = new (ControllerStub as jest.MockedClass<typeof ControllerStub>)()

    const sut = new ExpressRouteAdapter(controllerSpy)

    await sut.adapt(req, res)

    expect(controllerSpy.handleRequest).toHaveBeenCalledWith({ anyBody: 'any_body' })
  })
})
