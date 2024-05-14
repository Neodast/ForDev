import { Repository } from 'typeorm';
import { Comment } from '../../entities/postgreSQL/CommentEntity';
import { pgDataSource } from '../../appDataSourse';
import CommentModel from '../../../core/models/CommentModel';
import CommentRepository from '../../../core/repositories/CommentRepository';
import PgCommentMapper from '../../dbMappers/postgreSQL/PgCommentMapper';
import ApiError from '../../../utils/exceptions/ApiError';
import UserSafeDto from '../../../utils/dtos/users/UserSafe.dto';

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

  public async getById(id: number): Promise<CommentModel> {
    return PgCommentMapper.mapToCommentModel(await this.findComment({ id }));
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
    const dbComment = await this.getById(id);
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

export default new PgCommentRepository();
