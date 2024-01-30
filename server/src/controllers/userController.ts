import express, { NextFunction, Request, Response } from 'express';
import userService from '../services/userService';
import { RequestWithBody, RequestWithQuery } from '../utils/types/request.type';
import UserCreateDto from '../models/dto/userCreate.dto';
import accountService from '../services/accountService';
import tokenService from '../services/tokenService';
import UserLoginDto from '../models/dto/userLoginInput.dto';
import IVerify from '../models/dto/verify.dto';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const users = await userService.getAll();
    // res.send(users);
    res.send(req.cookies);
  } catch (e) {
    console.log(e);
  }
};

const createUser = async (
  req: RequestWithBody<UserCreateDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.create(req.body);
    res.send(await userService.getAll());
  } catch (e) {
    console.log(e);
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
    console.log(e);
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
    console.log(e);
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
    console.log(e);
  }
};

export default { createUser, getAllUsers, registration, login, verify };
