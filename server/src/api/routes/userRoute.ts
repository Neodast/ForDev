import express, { Router } from 'express';
import userController from '../controllers/userController';
import { accountLoginValidation } from '../validation/login.validation';
import { accountRegisterValidation } from '../validation/register.validation';
import { authMiddleware } from '../middlewares/auth.middleware';

const userRouter: Router = express.Router();

userRouter.get('/verify', accountRegisterValidation, userController.verify);
userRouter.post(
  '/registration',
  accountRegisterValidation,
  userController.registration
);
userRouter.get('/users',  userController.getAllUsers);
userRouter.post('/login', userController.login);
userRouter.get('/refresh', userController.refresh);

export default userRouter;