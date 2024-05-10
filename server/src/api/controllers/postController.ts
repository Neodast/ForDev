import { NextFunction, Request, Response } from 'express';
import postService from '../../core/services/PostService';
import PostModel from '../../core/models/PostModel';
import PostInputDto from '../../utils/dtos/posts/PostInput.dto';

class PostController {
  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: PostInputDto = req.body;
      const createdPost: PostModel = await postService.createPost(post);
      res.json(createdPost);
    } catch (e) {
      next(e);
    }
  }

  public async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: PostModel = req.body;
      const updatedPost = await postService.updatePost(post);
      res.json(updatedPost);
    } catch (e) {
      next(e);
    }
  }

  public async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: PostModel = req.body;
      await postService.deletePost(post);
      res.sendStatus(200);
    } catch (e) {
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
