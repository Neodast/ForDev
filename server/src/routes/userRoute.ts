import express, { Router } from 'express';
import userController from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.get('/users', userController.getAllUsers);
userRouter.get('/auth/verify', userController.verify)
userRouter.post('/user', userController.createUser);
userRouter.post('/auth/registration', userController.registration);
userRouter.post('/auth/login', userController.login);

export default userRouter;
