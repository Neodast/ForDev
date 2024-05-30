import { inject, injectable } from 'inversify';
import CommentInputDto from '../../utils/dtos/comment/comment-input.dto';
import CommentModel from '../models/comment.model';
import CommentRepository from '../repositories/comment.repository.type';
import { CommentTypes } from '../types/comment.types';
import { PostTypes } from '../types/post.types';
import PostService from './post.service';

@injectable()
class CommentService {
  constructor(
    @inject(CommentTypes.CommentRepository)
    private commentRepository: CommentRepository,
    @inject(PostTypes.PostService)
    private postService: PostService,
  ) {}

  public async addPostComment(
    commentData: CommentInputDto,
  ): Promise<CommentModel> {
    const dbPost = await this.postService.getPostById(commentData.postId);

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
    const dbPost = await this.postService.getPostById(postId);
    return this.commentRepository.getCommentsByPost(dbPost);
  }
}

export default CommentService;
