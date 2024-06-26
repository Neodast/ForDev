import { Container } from 'inversify';
import { CommentTypes } from '../../utils/types/containers/comment.types';
import CommentService from '../services/comment.service';
import PgCommentRepository from '../../db/dbRepositories/comment.repository';
import CommentRepository from '../repositories/comment.repository.type';
import { CommentController } from '../../api/controllers/comment.controller';

export const commentContainer = new Container({ defaultScope: 'Singleton' });

commentContainer
  .bind<CommentService>(CommentTypes.CommentService)
  .to(CommentService);
commentContainer
  .bind<CommentRepository>(CommentTypes.CommentRepository)
  .to(PgCommentRepository);
commentContainer
  .bind<CommentController>(CommentTypes.CommentController)
  .to(CommentController);
