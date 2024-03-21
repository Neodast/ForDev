import express, { Router } from 'express';
import userController from '../controllers/userController';
import { accountLoginValidation } from '../validators/login.validator';
import { accountRegisterValidation } from '../validators/register.validator';
import { authMiddleware } from '../middlewares/auth.middleware';

const userRouter: Router = express.Router();

userRouter.get('/verify', userController.verify);
userRouter.post(
  '/registration',
  accountRegisterValidation,
  userController.registration,
);
userRouter.get('/users', authMiddleware, userController.getAllUsers);
userRouter.post('/login', accountLoginValidation, userController.login);
userRouter.get('/refresh', userController.refresh);

export default userRouter;
