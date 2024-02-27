import { Request } from 'express'
import TokenPayloadDto from '../../models/dto/TokenDtos/tokenPayload.dto'

export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndBody<T, K> = Request<T, {}, K>