import express, { Router } from 'express';
import postController from '../controllers/postController';

const postRouter: Router = express.Router();

postRouter.get('/posts', postController.getAllPosts);
postRouter.post('/newPost', postController.createPost);
postRouter.delete('/deletePost', postController.deletePost);

export default postRouter;
