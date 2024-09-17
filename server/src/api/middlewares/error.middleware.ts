import { NextFunction, Request, Response } from 'express';
import ApiError from '../../utils/exceptions/api-error';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ error: err.status, message: err.message, stack: err.errors });
  }
  return res.status(500).json({ message: 'Unexpected error.' });
};
