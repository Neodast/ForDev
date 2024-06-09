import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { pgDataSource } from '../db.config';
import CommentModel from '../../core/models/comment.model';
import CommentRepository from '../../core/repositories/comment.repository.type';
import PgCommentMapper from '../dbMappers/comment.db-mapper';
import ApiError from '../../utils/exceptions/api-error';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import CommentCreateDto from '../../utils/dtos/comment/comment-create.dto';
import PostModel from '../../core/models/post.model';
import { injectable } from 'inversify';

@injectable()
class PgCommentRepository implements CommentRepository {
  private readonly commentRepository: Repository<Comment>;

  constructor() {
    this.commentRepository = pgDataSource.getRepository(Comment);
  }

  private async findComment(
    criteria: Record<string, unknown>,
  ): Promise<Comment> {
    const dbComment = await this.commentRepository.findOne({
      where: criteria,
      relations: ['author'],
    });
    if (!dbComment) {
      throw new Error('Comment is not found!');
    }
    return dbComment;
  }

  private async findComments(
    criteria?: Record<string, unknown>,
  ): Promise<Comment[]> {
    const dbComments = await this.commentRepository.find({
      where: criteria,
      relations: ['author'],
    });
    if (!dbComments.length) {
      throw new Error('Comments are not found!');
    }
    return dbComments;
  }

  public async getById(commentId: number): Promise<CommentModel> {
    return PgCommentMapper.mapToCommentModel(await this.findComment({ id: commentId }));
  }

  public async getByAuthor(author: UserSafeDto): Promise<CommentModel[]> {
    return (await this.findComments({ author })).map((dbPost) =>
      PgCommentMapper.mapToCommentModel(dbPost),
    );
  }

  public async getAll(): Promise<CommentModel[]> {
    return (await this.findComments()).map((dbPost) =>
      PgCommentMapper.mapToCommentModel(dbPost),
    );
  }

  public async getCommentsByPost(post: PostModel): Promise<CommentModel[]> {
    return (await this.findComments({ post })).map((dbPost) =>
      PgCommentMapper.mapToCommentModel(dbPost),
    );
  }

  public async createComment(
    commentData: CommentCreateDto,
  ): Promise<CommentModel> {
    if (!commentData) {
      throw ApiError.BadRequest('Comment is undefined!');
    }
    const comment = this.commentRepository.create(commentData);
    return PgCommentMapper.mapToCommentModel(
      await this.commentRepository.save(comment),
    );
  }

  public async updateComment(
    commentId: number,
    newCommentData: CommentModel,
  ): Promise<CommentModel> {
    const dbComment = await this.getById(commentId);
    Object.assign(dbComment, newCommentData);
    return PgCommentMapper.mapToCommentModel(
      await this.commentRepository.save(dbComment),
    );
  }

  public async deleteComment(comment: CommentModel): Promise<void> {
    const dbComment = await this.findComment({ comment });
    await this.commentRepository.remove(dbComment);
  }
}

export default PgCommentRepository;
