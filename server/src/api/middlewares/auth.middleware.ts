import { TokenService } from '../../core/services/token.service';
import { TokenTypes } from '../../utils/types/containers/token.types';
import ApiError from '../../utils/exceptions/api-error';
import { NextFunction, Request, Response } from 'express';
import { appContainer } from '../../app.container';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenService = appContainer.get<TokenService>(
      TokenTypes.TokenService,
    );

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = await tokenService.validateAccessToken(accessToken);

    req.user = userData;

    next();
  } catch (e) {
    return next(e);
  }
};
