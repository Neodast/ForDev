import { NextFunction, Response } from 'express';
import CommentService from '../../core/services/comment.service';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import CommentInputDto from '../../utils/dtos/comment/comment-input.dto';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject } from 'inversify';
import { CommentTypes } from '../../core/types/comment.types';
import { controller, httpGet, httpPost } from 'inversify-express-utils';

@controller('/comment')
export class CommentController {
  constructor(
    @inject(CommentTypes.CommentService) private commentService: CommentService,
  ) {}

  @httpPost('/addToPost')
  public async addCommentToPost(
    req: RequestWithBody<CommentInputDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const comment = req.body;
      const createdComment = this.commentService.addPostComment(comment);
      res.json(createdComment).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/getByPostId')
  public async getCommentsByPostId(
    req: RequestWithQuery<{ postId: number }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const postId = req.query.postId;
      const comments = await this.commentService.getCommentsByPostId(postId);
      res.status(StatusCodes.SUCCESS).json(comments);
    } catch (e) {
      next(e);
    }
  }
}
