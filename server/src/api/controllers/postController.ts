import { NextFunction, Request, Response } from 'express';
import PostModel from '../../core/models/PostModel';
import PostInputDto from '../../utils/dtos/posts/PostInput.dto';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import StatusCodes from '../../utils/enums/HttpStatusCodes';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types/posts.types';
import PostService from '../../core/services/PostService';

@injectable()
class PostController {
  constructor(@inject(TYPES.PostService) private postService: PostService){}

  public async createPost(
    req: RequestWithBody<PostInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const post = req.body;
      const createdPost: PostModel = await this.postService.createPost(post);
      res.json(createdPost).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  public async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: PostModel = req.body;
      const updatedPost = await this.postService.updatePost(post);
      res.json(updatedPost).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  public async deletePost(
    req: RequestWithBody<{ postId: number }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.body;
      await this.postService.deletePost(postId);
      res.sendStatus(StatusCodes.DELETED);
    } catch (e) {
      next(e);
    }
  }

  public async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await this.postService.getAllPosts();
      res.json(posts).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  public async getPostById(
    req: RequestWithQuery<{ postId: number }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.query;
      const post = await this.postService.getPostById(postId);
      res.json(post).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}

export default PostController;
