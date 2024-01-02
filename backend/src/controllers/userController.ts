import express, { NextFunction, Request, Response } from 'express';
import userService from '../services/userService';
import { RequestWithBody } from '../utils/types/request.type';
import UserDto from '../dto/user.dto';
import { request } from 'http';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAll();
    res.send(users);
  } catch (e) {
    console.log(e);
  }
};

const createUser = async (
  req: RequestWithBody<UserDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    // const user = await userService.create(req.body);
    res.json({...req.body})
  } catch (e) {
    console.log(e);
  }
};

export default { createUser, getAllUsers };
