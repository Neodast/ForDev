import { tokenContainer } from '../../core/containers/token.container';
import TokenService from '../../core/services/token.service';
import { TokenTypes } from '../../core/types/token.types';
import ApiError from '../../utils/exceptions/api-error';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenService = tokenContainer.get<TokenService>(TokenTypes.TokenService);

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError('header'));
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError('access'));
    }
    const userData = await tokenService.validateAccessToken(accessToken);

    req.user = userData;

    next();
  } catch (e) {
    return next(e);
  }
};
