import { NextFunction, Response } from 'express';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import { LikeService } from '../../core/services/like.service';
import LikePostInputDto from '../../utils/dtos/like/like-post-input.dto';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject } from 'inversify';
import { LikeTypes } from '../../utils/types/containers/like.types';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { PostGetByIdDto } from '../../utils/dtos/post/post-get-by-id.dto';
import LikeThreadInputDto from '../../utils/dtos/like/like-thread-input.dto';
import { ThreadGetByIdDto } from '../../utils/dtos/thread/thread-get-by-id.dto';

@controller('/like')
class LikeController {
  constructor(
    @inject(LikeTypes.LikeService) private likeService: LikeService,
  ) {}

  @httpPost('/addLikeToPost')
  public async likePost(
    req: RequestWithBody<LikePostInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { user, postId } = req.body;
      const like = await this.likeService.likePost(user, postId);
      res.json(like).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  @httpPost('/addLikeToThread')
  public async likeThread(
    req: RequestWithBody<LikeThreadInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { threadId, user } = req.body;
      const like = await this.likeService.likeThread(user, threadId);
      res.json(like).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/getPostLikesCount')
  public async getPostLikesCount(
    req: RequestWithQuery<PostGetByIdDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.query;
      const likesCount = await this.likeService.getPostLikesCount(postId);
      res.json(likesCount).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/getThreadLikesCount')
  public async getThreadLikesCount(
    req: RequestWithQuery<ThreadGetByIdDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { threadId } = req.query;
      const likesCount = await this.likeService.getPostLikesCount(threadId);
      res.json(likesCount).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}

export default LikeController;
