import { ServerError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/ports'

export const created = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 201,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})
