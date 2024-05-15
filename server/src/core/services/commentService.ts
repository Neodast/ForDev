import pgCommentRepository from '../../db/dbRepositories/postgreSQL/PgCommentRepository';
import CommentInputDto from '../../utils/dtos/comment/CommentInput.dto';
import CommentModel from '../models/CommentModel';
import CommentRepository from '../repositories/CommentRepository';
import PostService from './PostService';

class CommentService {
  constructor(readonly commentRepository: CommentRepository) {}

  public async addPostComment(
    commentData: CommentInputDto,
  ): Promise<CommentModel> {
    const dbPost = await PostService.getPostById(commentData.postId);

    return this.commentRepository.createComment({
      author: commentData.author,
      text: commentData.text,
      post: dbPost,
    });
  }

  public async deleteComment(comment: CommentModel): Promise<void> {
    return this.commentRepository.deleteComment(comment);
  }

  public async getAllComments(): Promise<CommentModel[]> {
    return this.commentRepository.getAll();
  }

  public async getCommentsByPostId(postId: number): Promise<CommentModel[]> {
    const dbPost = await PostService.getPostById(postId);
    return this.commentRepository.getCommentsByPost(dbPost);
  }
}

export default new CommentService(pgCommentRepository);
