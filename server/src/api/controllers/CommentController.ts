import { NextFunction, Response } from 'express';
import CommentService from '../../core/services/CommentService';
import { RequestWithBody, RequestWithQuery } from '../../utils/types/request.type';
import CommentInputDto from '../../utils/dtos/comment/CommentInput.dto';
import StatusCodes from '../../utils/enums/HttpStatusCodes';

class CommentController {
  public async addCommentToPost(
    req: RequestWithBody<CommentInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const comment = req.body;
      const createdComment = CommentService.addPostComment(comment);
      res.json(createdComment).status(StatusCodes.CREATED);
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
      res.json(comments).status(StatusCodes.SUCCESS);
    }catch(e) {
      next(e);
    }
  }
}

export default new CommentController();
