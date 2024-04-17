import express, { Router } from 'express';
import postController from '../controllers/postController';
import { authMiddleware } from '../middlewares/auth.middleware';

const postRouter: Router = express.Router();

postRouter.get('/posts', authMiddleware, postController.getAllPosts);
postRouter.put("/updatePost", authMiddleware, postController.updatePost);
postRouter.post('/newPost', postController.createPost);
postRouter.delete('/deletePost', postController.deletePost);

export default postRouter;
