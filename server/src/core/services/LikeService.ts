import PgLikeRepository from '../../db/dbRepositories/postgreSQL/PgLikeRepository';
import UserSafeDto from '../../utils/dtos/users/UserSafe.dto';
import LikeRepository from '../repositories/LikeRepository';
import PostService from './PostService';

class LikeService {
  constructor(readonly likeRepository: LikeRepository) {}

  public async likePost(user: UserSafeDto, postId: number) {
    const dbPost = await PostService.getPostById(postId);
    return this.likeRepository.addPostLike(dbPost, user);
  }

  public async getPostLikesCount(postId: number) {
    const dbPost = await PostService.getPostById(postId);
    const likes = await this.likeRepository.getLikesByPost(dbPost);
    return likes.length;
  }
}

export default new LikeService(PgLikeRepository);
