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

  public async getLikeByUser(postId: number, userId: string) : Promise<LikeModel | null> {
    const dbLike = await this.likeRepository.findOne({
      where: {
        user: {id: userId},
        post: {id: postId},
      },
      relations: ['user']
    })

    if(!dbLike) {
      return null;
    }

    return PgLikeMapper.mapToLikeModel(dbLike);
  }

  public async getLikesByPost(post: PostModel): Promise<LikeModel[]> {
    const dbLikes = await  this.likeRepository.find({
      where: { post: post },
      relations: ['user'],
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

  public async deletePostLike(like: LikeModel): Promise<void> {
    await this.likeRepository.delete(like);
  }
}

export default new PgLikeRepository();
