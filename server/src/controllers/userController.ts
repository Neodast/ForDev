import { NextFunction, Request, Response } from 'express';
import { RequestWithBody, RequestWithQuery } from '../utils/types/request.type';
import UserCreateDto from '../models/dto/userCreate.dto';
import accountService from '../services/accountService';
import tokenService from '../services/tokenService';
import UserLoginDto from '../models/dto/userLoginInput.dto';
import IVerify from '../models/dto/verify.dto';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {

    res.send(req.cookies);
  } catch (e) {
    next(e);
  }
};

const registration = async (
  req: RequestWithBody<UserCreateDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await accountService.register(req.body);
    tokenService.saveRefreshTokenCookie(res, userData.tokens.refreshToken);
    res.send(userData);
  } catch (e) {
    next(e);
  }
};

const verify = async (
  req: RequestWithQuery<IVerify>,
  res: Response,
  next: NextFunction
) => {
  try {
    accountService.verify(req.query.id);
  } catch (e) {
    next(e);
  }
};

const login = async (
  req: RequestWithBody<UserLoginDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await accountService.login(req.body);
    // req.headers.authorization = userData.tokens.refreshToken;
    // res.send(req.headers.authorization);
    res.send(userData);
  } catch (e) {
    next(e);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
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
};

export default {
  getAllUsers,
  registration,
  refresh,
  login,
  verify,
};
