import { NextFunction, Request, Response } from 'express';
import { RequestWithBody, RequestWithQuery } from '../utils/types/request.type';
import UserCreateDto from '../models/dto/UserDtos/userCreate.dto';
import accountService from '../services/accountService';
import tokenService from '../services/tokenService';
import UserLoginDto from '../models/dto/AuthDtos/userLoginInput.dto';
import IVerify from '../models/dto/AuthDtos/verify.dto';

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
      tokenService.saveRefreshTokenCookie(res, userData.tokens.refreshToken);
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
      await tokenService.saveRefreshTokenCookie(
        res,
        userData.tokens.refreshToken
      );
      res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await accountService.refresh(refreshToken);

      tokenService.saveRefreshTokenCookie(res, userData.tokens.refreshToken);

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
