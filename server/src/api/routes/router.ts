import express, { Router } from 'express';
import userRouter from './user.router';
import postRouter from './post.router';
import sectionRouter from './section.router';
import likedRouter from './liked.router';
import likeRouter from './like.router';
import commentRouter from './comment.router';

const router: Router = express.Router();

router.use('/auth', userRouter);
router.use('/board', postRouter);
router.use('/section', sectionRouter);
router.use('/liked', likedRouter);
router.use('/like', likeRouter);
router.use('/comment', commentRouter);

export default router;
