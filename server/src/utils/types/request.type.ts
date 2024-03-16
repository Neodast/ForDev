import { Request } from 'express';

export type RequestWithBody<T> = Request<Record<string, unknown>, Record<string, unknown>, T>;
export type RequestWithQuery<T> = Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, K> = Request<T, Record<string, unknown>, K>;
