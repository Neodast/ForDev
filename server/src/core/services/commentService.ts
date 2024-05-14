import pgCommentRepository from '../../db/dbRepositories/postgreSQL/PgCommentRepository';
import CommentModel from '../models/CommentModel';
import CommentRepository from '../repositories/CommentRepository';

class CommentService {
  constructor(readonly commentRepository: CommentRepository) {}

  public async createComment(commentData: CommentModel): Promise<CommentModel> {
    return this.commentRepository.createComment(commentData);
  }

  public async deleteComment(comment: CommentModel): Promise<void> {
    return this.commentRepository.deleteComment(comment);
  }

  public async getAllComments(): Promise<CommentModel[]> {
    return this.commentRepository.getAll();
  }
}

export default new CommentService(pgCommentRepository);
