import { Repository } from 'typeorm';
import LikeRepository from '../../../core/repositories/LikeRepository';
import { Like } from '../../entities/postgreSQL/LikeEntity';
import { pgDataSource } from '../../appDataSourse';
import LikeModel from '../../../core/models/LikeModel';
import PostModel from '../../../core/models/PostModel';
import PgLikeMapper from '../../dbMappers/postgreSQL/PgLikeMapper';
import UserSafeDto from '../../../utils/dtos/users/UserSafe.dto';

class PgLikeRepository implements LikeRepository {
  private readonly likeRepository: Repository<Like>;

  constructor() {
    this.likeRepository = pgDataSource.getRepository(Like);
  }

  public async getLikesByPost(post: PostModel): Promise<LikeModel[]> {
    return this.likeRepository.find({
      where: { post: post },
      relations: ['user'],
    });
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
}

export default new PgLikeRepository();
