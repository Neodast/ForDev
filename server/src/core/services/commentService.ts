import pgCommentRepository from '../../db/dbRepositories/postgreSQL/pgCommentRepository';
import CommentModel from '../models/commentModel';
import ICommentRepository from '../repositories/ICommentRepository';

class CommentService {
  constructor(readonly commentRepository: ICommentRepository) {}

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
