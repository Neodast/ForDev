import pgCommentRepository from '../../db/dbRepositories/comment.repository';
import CommentInputDto from '../../utils/dtos/comment/comment-input.dto';
import CommentModel from '../models/comment.model';
import CommentRepository from '../repositories/comment.repository.type';
import PostService from './posts.service';

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
