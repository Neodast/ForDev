import express, { Router } from 'express';
import userRouter from './userRoute';
import postRouter from './postRouter';
import sectionRouter from './sectionRoute';
import quizRouter from './quizRouter';
import threadRouter from './threadRouter';
import likedRouter from './likedRoute';
import likeRouter from './likeRouter';

const router: Router = express.Router();

router.use('/auth', userRouter);
router.use('/board', postRouter);
router.use('/section', sectionRouter);
router.use('/board', quizRouter);
router.use('/board', threadRouter);
router.use('/liked', likedRouter);
router.use('/like', likeRouter);

export default router;
