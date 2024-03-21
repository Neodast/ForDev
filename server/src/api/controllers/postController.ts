import { NextFunction, Request, Response } from 'express';
import postService from '../../core/services/postService';
import PostModel from '../../core/models/postModel';

class PostController {
  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: PostModel = req.body;
      const createdPost: PostModel = await postService.createPost(post);
      res.json(createdPost);
    } catch (e) {
      next(e);
    }
  }

  public async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: PostModel = req.body;
      res.send(postService.deletePost(post));
    } catch (e)    {
      next(e);
    }
  }

  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
