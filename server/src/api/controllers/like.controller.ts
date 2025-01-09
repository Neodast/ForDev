import { NextFunction, Response } from 'express';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import { LikeService } from '../../core/services/like.service';
import LikeInputDto from '../../utils/dtos/like/like-input.dto';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject } from 'inversify';
import { LikeTypes } from '../../utils/types/containers/like.types';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { GetLikesCountDto } from '../../utils/dtos/like/get-likes-count.dto';

@controller('/likes')
class LikeController {
  constructor(
    @inject(LikeTypes.LikeService) private likeService: LikeService,
  ) {}

  @httpPost('/add')
  public async like(
    req: RequestWithBody<LikeInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { user, id, entityType } = req.body;
      const like = {
        post: await this.likeService.likePost(user, id),
        thread: await this.likeService.likeThread(user, id),
      }[entityType];
      res.json(like).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/count')
  public async getPostLikesCount(
    req: RequestWithQuery<GetLikesCountDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id, entityType } = req.query;
      const likesCount = {
        post: await this.likeService.getPostLikesCount(id),
        thread: await this.likeService.getPostLikesCount(id),
      }[entityType];
      res.json(likesCount).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}

export default LikeController;
