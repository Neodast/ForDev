import { NextFunction, Request, Response } from 'express';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import UserCreateDto from '../../utils/dtos/users/UserCreate.dto';
import UserService from '../../core/services/UserService';
import UserLoginDto from '../../utils/dtos/auth/UserLoginInput.dto';
import VerifyIdDto from '../../utils/dtos/auth/VerifyId.dto';
import CookieHelper from '../helpers/cookieHelper';
import StatusCodes from '../../utils/enums/HttpStatusCodes';

class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  async registration(
    req: RequestWithBody<UserCreateDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userData = await UserService.register(req.body);
      await CookieHelper.saveRefreshTokenCookie(
        res,
        userData.tokens.refreshToken,
      );
      res.json(userData).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  async verify(
    req: RequestWithQuery<VerifyIdDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await UserService.verify(req.query.id);
      res.sendStatus(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  async login(
    req: Request<UserLoginDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login({ email, password });
      await CookieHelper.saveRefreshTokenCookie(
        res,
        userData.tokens.refreshToken,
      );
      res.json(userData).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await UserService.logout(refreshToken);
      await CookieHelper.removeRefreshTokenCookie(res);
      res.sendStatus(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      await CookieHelper.saveRefreshTokenCookie(
        res,
        userData.tokens.refreshToken,
      );
      res.json(userData).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
