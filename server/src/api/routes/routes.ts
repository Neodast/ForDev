import express, { Router } from 'express';
import userRouter from './userRoute';
import postRouter from './postRouter';

const router: Router = express.Router();

router.use('/auth', userRouter);
router.use('/board', postRouter);

export default router;
