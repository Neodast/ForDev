import express, { Router } from 'express';
import userRouter from './userRoute';
import postRouter from './postRouter';
import sectionRouter from './sectionRoute';
import likedRouter from './likedRoute';
import likeRouter from './likeRouter';
import commentRouter from './commentRoute';

const router: Router = express.Router();

router.use('/auth', userRouter);
router.use('/board', postRouter);
router.use('/section', sectionRouter);
router.use('/liked', likedRouter);
router.use('/like', likeRouter);
router.use('/comment', commentRouter);

export default router;
