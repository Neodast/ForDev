import express, { Router } from 'express';
import userController from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.get('/users', userController.getAllUsers);
userRouter.get('auth/verify/:userId')
userRouter.post('/user', userController.createUser);
userRouter.post('/auth', userController.registration);
userRouter.post('/login', userController.login);

export default userRouter;
