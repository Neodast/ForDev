import { Repository } from 'typeorm';
import LikeRepository from '../../core/repositories/like.repository.type';
import { Like } from '../entities/like.entity';
import { pgDataSource } from '../db.config';
import LikeModel from '../../core/models/like.model';
import PostModel from '../../core/models/post.model';
import PgLikeMapper from '../dbMappers/like.db-mapper';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import { injectable } from 'inversify';
import ThreadModel from '../../core/models/thread.model';

@injectable()
class PgLikeRepository implements LikeRepository {
  private readonly likeRepository: Repository<Like>;

  constructor() {
    this.likeRepository = pgDataSource.getRepository(Like);
  }

  public async getPostLikeByUser(
    postId: number,
    userId: string,
  ): Promise<LikeModel | null> {
    const dbLike = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
      relations: ['user'],
    });

    if (!dbLike) {
      return null;
    }

    return PgLikeMapper.mapToLikeModel(dbLike);
  }

  public async getThreadLikeByUser(
    threadId: number,
    userId: string,
  ): Promise<LikeModel | null> {
    const dbLike = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        thread: { id: threadId },
      },
      relations: ['user'],
    });
    if (!dbLike) {
      return null;
    }
    return PgLikeMapper.mapToLikeModel(dbLike);
  }

  public async getLikesByPost(postId: number): Promise<LikeModel[]> {
    const dbLikes = await this.likeRepository.find({
      where: { post: { id: postId } },
      relations: ['user', 'post'],
    });
    return dbLikes.map((like) => PgLikeMapper.mapToLikeModel(like));
  }

  public async getLikesByThread(threadId: number): Promise<LikeModel[]> {
    const dbLikes = await this.likeRepository.find({
      where: { thread: { id: threadId } },
      relations: ['user', 'thread'],
    });
    return dbLikes.map((like) => PgLikeMapper.mapToLikeModel(like));
  }

  public async addPostLike(
    postData: PostModel,
    userData: UserSafeDto,
  ): Promise<LikeModel> {
    const dbLike = this.likeRepository.create({
      post: postData,
      user: userData,
    });
    return PgLikeMapper.mapToLikeModel(await this.likeRepository.save(dbLike));
  }

  public async addThreadLike(
    threadData: ThreadModel,
    userData: UserSafeDto,
  ): Promise<LikeModel> {
    const dbLike = this.likeRepository.create({
      thread: threadData,
      user: userData,
    });
    return PgLikeMapper.mapToLikeModel(await this.likeRepository.save(dbLike));
  }

  public async deleteLike(like: LikeModel): Promise<void> {
    await this.likeRepository.delete(like);
  }
}

export default PgLikeRepository;
