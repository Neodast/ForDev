import { NextFunction, Response } from 'express';
import CommentService from '../../core/services/comment.service';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import CommentInputDto from '../../utils/dtos/comment/comment-input.dto';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject } from 'inversify';
import { CommentTypes } from '../../utils/types/containers/comment.types';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import { CommentUpdateDto } from '../../utils/dtos/comment/comment-update.dto';

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

  @httpPut('/update')
  public async updateComment(
    req: RequestWithBody<CommentUpdateDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const commentUpdateData = req.body;
      const updatedPost =
        await this.commentService.updateComment(commentUpdateData);
      res.json(updatedPost).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpDelete('/delete')
  public async deleteComment(
    req: RequestWithBody<{ commentId: number }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { commentId } = req.body;
      await this.commentService.deleteComment(commentId);
      res.sendStatus(StatusCodes.DELETED);
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
      console.log(5);
      const { postId } = req.query;
      console.log(postId)
      const comments = await this.commentService.getCommentsByPostId(postId);
      res.json(comments).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}
