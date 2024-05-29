import { NextFunction, Response } from 'express';
import LikedAddItemDto from '../../utils/dtos/likes/liked-item-create.dto';
import LikedService from '../../core/services/liked.service';
import { RequestWithBody } from '../../utils/types/request.type';

class LikedController {
  public async like(
    req: RequestWithBody<LikedAddItemDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const likedItem = req.body;
      const savedLikedItem = await LikedService.like(likedItem);
      res.send(savedLikedItem);
    } catch (e) {
      next(e);
    }
  }
}

export default new LikedController();
