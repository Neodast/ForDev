import { NextFunction, Request, Response } from 'express';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import UserCreateDto from '../../utils/dtos/users/UserCreate.dto';
import userService from '../../core/services/UserService';
import UserLoginDto from '../../utils/dtos/auth/UserLoginInput.dto';
import VerifyIdDto from '../../utils/dtos/auth/VerifyId.dto';
import CookieHelper from '../helpers/cookieHelper';
import LoginOutputDto from '../../utils/dtos/auth/LoginOutput.dto';

class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
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
      const userData = await userService.register(req.body);
      await CookieHelper.saveRefreshTokenCookie(
        res,
        userData.tokens.refreshToken,
      );
      res.send(userData);
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
      userService.verify(req.query.id);
    } catch (e) {
      next(e);
    }
  }

  async login(
    req: Request<UserLoginDto>,
    res: Response<LoginOutputDto>,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login({ email, password });
      await CookieHelper.saveRefreshTokenCookie(
        res,
        userData.tokens.refreshToken,
      );
      res.send({
        user: userData.user,
        tokens: userData.tokens,
      });
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      await CookieHelper.removeRefreshTokenCookie(res);
      res.send(200);
    } catch (e) {
      next(e);
    }
  }

  async refresh(
    req: Request,
    res: Response<LoginOutputDto>,
    next: NextFunction,
  ) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      await CookieHelper.saveRefreshTokenCookie(
        res,
        userData.tokens.refreshToken,
      );
      res.send({
        user: userData.user,
        tokens: userData.tokens,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
