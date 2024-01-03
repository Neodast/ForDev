import express, { Router } from 'express';
import userController from '../controllers/userController'

const userRouter : Router = express.Router();

userRouter.get('/users', userController.getAllUsers);
userRouter.post('/user', userController.createUser);
userRouter.post('/auth', userController.registration)

export default userRouter
