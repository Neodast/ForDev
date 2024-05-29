import express, { Router } from 'express';
import LikeController from '../controllers/like.controller';

const likeRouter: Router = express.Router();

likeRouter.post('/likePost', LikeController.likePost)
likeRouter.get('/postLikesCount', LikeController.getPostLikesCount)

export default likeRouter;
