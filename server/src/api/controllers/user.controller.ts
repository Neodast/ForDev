import { NextFunction, Request, Response } from 'express';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import UserCreateDto from '../../utils/dtos/users/user-create.dto';
import UserService from '../../core/services/user.service';
import UserLoginDto from '../../utils/dtos/auth/user-login-input.dto';
import VerifyIdDto from '../../utils/dtos/auth/verify-id.dto';
import CookieHelper from '../helpers/cookie.helper';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject } from 'inversify';
import { UserTypes } from '../../core/types/user.types';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { authMiddleware } from '../middlewares/auth.middleware';

@controller('/user')
class UserController {
  constructor(
    @inject(UserTypes.UserService) private userService: UserService,
  ) {}

  @httpGet('/all')
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpPost('/auth/register')
  async registration(
    req: RequestWithBody<UserCreateDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userData = await this.userService.register(req.body);
      await CookieHelper.saveRefreshTokenCookie(
        res,
        userData.tokens.refreshToken,
      );
      res.json(userData).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpPost('/auth/verify')
  async verify(
    req: RequestWithQuery<VerifyIdDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await this.userService.verify(req.query.id);
      res.sendStatus(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  @httpPost('/auth/login')
  async login(req: Request<UserLoginDto>, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await this.userService.login({ email, password });
      await CookieHelper.saveRefreshTokenCookie(
        res,
        userData.tokens.refreshToken,
      );
      res.json(userData).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/auth/logout', authMiddleware)
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await this.userService.logout(refreshToken);
      await CookieHelper.removeRefreshTokenCookie(res);
      res.sendStatus(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpPost('/auth/refresh')
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this.userService.refresh(refreshToken);
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

export default UserController;
