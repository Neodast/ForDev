import { NextFunction, Response } from 'express';
import LikedAddItemDto from '../../utils/dtos/posts/liked/LikedAddItem.dto';
import LikedService from '../../core/services/LikedService';
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
