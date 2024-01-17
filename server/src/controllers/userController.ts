import express, { NextFunction, Request, Response } from 'express';
import userService from '../services/userService';
import { RequestWithBody } from '../utils/types/request.type';
import UserCreateDto from '../models/dto/userCreate.dto';
import accountService from '../services/accountService';
import UserLoginDto from '../models/dto/userLogin.dto';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAll();
    res.send(users);
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
    res.send(userData);
  } catch (e) {
    console.log(e);
  }
};

const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
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
    const { email, password } = req.body;
    const userData = await accountService.login({ email, password });
    res.cookie('refreshToken', userData.tokens.refreshToken, {
      maxAge: 30,
      httpOnly: true,
    });
    res.send(userData);
  } catch (e) {
    console.log(e);
  }
};

export default { createUser, getAllUsers, registration, login };
