import { Repository } from 'typeorm';
import { Comment } from '../../entities/commentEntity';
import appDataSource from '../../appDataSourse';
import CommentModel from '../../../core/models/commentModel';
import ICommentRepository from '../../../core/repositories/ICommentRepository';
import PgCommentMapper from '../../dbMappers/postgre/pgCommentMapper';
import ApiError from '../../../utils/exeptions/apiError';
import UserSafeDto from '../../../utils/dtos/userDtos/userSafe.dto';

class PgCommentRepository implements ICommentRepository {
  private readonly commentRepository: Repository<Comment>;

  constructor() {
    this.commentRepository = appDataSource.getRepository(Comment);
  }

  private async findComment(
    criteria: Record<string, unknown>,
  ): Promise<CommentModel> {
    const dbComment = await this.commentRepository.findOneBy(criteria);
    if (!dbComment) {
      throw new Error('Comment is not found!');
    }
    const comment: CommentModel = PgCommentMapper.mapToCommentModel(dbComment);
    return comment;
  }

  private async findComments(
    criteria?: Record<string, unknown>,
  ): Promise<CommentModel[]> {
    const dbComments = await this.commentRepository.find(criteria);
    if (!dbComments.length) {
      throw new Error('Comments are not found!');
    }
    const comments = dbComments.map((dbPost) =>
      PgCommentMapper.mapToCommentModel(dbPost),
    );
    return comments;
  }

  public async getById(id: number): Promise<CommentModel> {
    return this.findComment({ id });
  }

  public async getByAuthor(author: UserSafeDto): Promise<CommentModel[]> {
    return this.findComments({ author });
  }

  public async getAll(): Promise<CommentModel[]> {
    return this.findComments();
  }

  public async createComment(commentData: CommentModel): Promise<CommentModel> {
    if (!commentData) {
      throw ApiError.BadRequest('Comment is undefined!');
    }
    const comment = this.commentRepository.create(commentData);
    return PgCommentMapper.mapToCommentModel(
      await this.commentRepository.save(comment),
    );
  }

  public async updateComment(
    id: number,
    newCommentData: CommentModel,
  ): Promise<CommentModel> {
    const comment = await this.getById(id);
    Object.assign(comment, newCommentData);
    return PgCommentMapper.mapToCommentModel(
      await this.commentRepository.save(comment),
    );
  }

  public async deleteComment(comment: CommentModel): Promise<void> {
    const dbComment = await this.getById(comment.id);
    await this.commentRepository.delete(dbComment);
  }
}

export default new PgCommentRepository();
