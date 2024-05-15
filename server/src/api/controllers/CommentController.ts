import { NextFunction, Response } from 'express';
import CommentService from '../../core/services/CommentService';
import { RequestWithBody, RequestWithQuery } from '../../utils/types/request.type';
import CommentInputDto from '../../utils/dtos/comment/CommentInput.dto';

class CommentController {
  public async addCommentToPost(
    req: RequestWithBody<CommentInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const comment = req.body;
      const createdComment = CommentService.addPostComment(comment);
      res.send(createdComment);
    } catch (e) {
      next(e);
    }
  }

  public async getCommentsByPostId(
    req: RequestWithQuery<{postId: number}>,
    res: Response,
    next: NextFunction
  ) {
    try{
      const postId = req.query.postId;
      const comments = await CommentService.getCommentsByPostId(postId);
      res.send(comments);
    }catch(e) {
      next(e);
    }
  }
}

export default new CommentController();
