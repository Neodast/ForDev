import express, { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { postsContainer } from '../../core/containers/posts.container';
import { TYPES } from '../../core/types/posts.types';
import PostController from '../controllers/post.controller';

const postRouter: Router = express.Router();
const postController = postsContainer.get<PostController>(TYPES.PostController);

postRouter.get('/posts', postController.getAllPosts);
postRouter.get('/post', postController.getPostById);
postRouter.put('/updatePost', authMiddleware, postController.updatePost);
postRouter.post('/newPost', authMiddleware, postController.createPost);
postRouter.delete('/deletePost', authMiddleware, postController.deletePost);

export default postRouter;
