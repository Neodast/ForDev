import express, { Router } from 'express';
import userRouter from './userRoute';
import postRouter from './postRouter';
import sectionRouter from './sectionRoute';
import quizRouter from './quizRouter';
import threadRouter from './threadRouter';

const router: Router = express.Router();

router.use('/auth', userRouter);
router.use('/board', postRouter);
router.use('/section', sectionRouter);
router.use('/board', quizRouter);
router.use('/board', threadRouter);

export default router;
