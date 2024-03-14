import { NextFunction, Request, Response } from 'express';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import UserCreateDto from '../../utils/dtos/userDtos/userCreate.dto';
import accountService from '../../core/services/userService';
import UserLoginDto from '../../utils/dtos/authDtos/userLoginInput.dto';
import IVerify from '../../utils/dtos/authDtos/verify.dto';
import CookieHelper from '../helpers/cookieHelper';

class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await accountService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async registration(
    req: RequestWithBody<UserCreateDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userData = await accountService.register(req.body);
      CookieHelper.saveRefreshTokenCookie(res, userData.tokens.refreshToken);
      res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  async verify(
    req: RequestWithQuery<IVerify>,
    res: Response,
    next: NextFunction
  ) {
    try {
      accountService.verify(req.query.id);
    } catch (e) {
      next(e);
    }
  }

  async login(
    req: RequestWithBody<UserLoginDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const userData = await accountService.login({ email, password });
      CookieHelper.saveRefreshTokenCookie(res, userData.tokens.refreshToken);
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await accountService.refresh(refreshToken);
      CookieHelper.saveRefreshTokenCookie(res, userData.tokens.refreshToken);
      res.json({
        ...userData.user,
        accessToken: userData.tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
