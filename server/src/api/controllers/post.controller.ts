import { NextFunction, Request, Response } from 'express';
import PostModel from '../../core/models/post.model';
import PostInputDto from '../../utils/dtos/posts/post-input.dto';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject } from 'inversify';
import { PostTypes } from '../../utils/types/containers/post.types';
import { PostService } from '../../core/services/post.service';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { imageUploadMiddleware } from '../middlewares/image-upload.middleware';

@controller('/post')
class PostController {
  constructor(
    @inject(PostTypes.PostService) private postService: PostService,
  ) {}

  @httpPost('/create', imageUploadMiddleware)
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

  @httpPut('/update')
  public async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: PostModel = req.body;
      const updatedPost = await this.postService.updatePost(post);
      res.json(updatedPost).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpDelete('/delete')
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

  @httpGet('/all')
  public async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await this.postService.getAllPosts();
      res.json(posts).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/')
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
