import express, { Router } from 'express';
import CommentController from '../controllers/CommentController';

const commentRouter: Router = express.Router();

commentRouter.post('/addToPost', CommentController.addCommentToPost);
commentRouter.get('/getByPostId', CommentController.getCommentsByPostId);

export default commentRouter;
