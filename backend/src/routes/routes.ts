import express, { Router } from 'express';
import userRouter from './userRoute';

const router: Router = express.Router();

router.use('/', userRouter)

export default router