import { NextFunction, Request, Response } from 'express';
import { RequestWithBody } from '../../utils/types/request.type';
import LikeService from '../../core/services/LikeService';
import LikeInputDto from '../../utils/dtos/likes/LikeInput.dto';

class LikeController {
  public async likePost(
    req: RequestWithBody<LikeInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { user, postId } = req.body;
      const like = await LikeService.likePost(user, postId);
      res.send(like);
    } catch (e) {
      next(e);
    }
  }

  public async getPostLikesCount(
    req: Request,
    res: Response<number>,
    next: NextFunction,
  ) {
    try {
      const postId = req.query.postId;
      const likesCount = await LikeService.getPostLikesCount(Number(postId));
      res.json(likesCount);
    } catch (e) {
      next(e);
    }
  }
}

export default new LikeController();
