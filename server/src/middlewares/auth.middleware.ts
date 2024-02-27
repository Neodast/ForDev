import tokenService from '../services/tokenService';
import ApiError from '../utils/exeptions/apiError';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split('')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);

    req.authUser = userData;

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
