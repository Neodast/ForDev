import { NextFunction, Request, Response } from 'express';
import postService from '../../core/services/postService';

class PostController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getAllPosts();
      res.json(posts);
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();