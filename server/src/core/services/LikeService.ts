import PgLikeRepository from '../../db/dbRepositories/postgreSQL/PgLikeRepository';
import UserSafeDto from '../../utils/dtos/users/UserSafe.dto';
import LikeRepository from '../repositories/LikeRepository';
import PostService from './PostService';

class LikeService {
  constructor(readonly likeRepository: LikeRepository) {}

  public async likePost(user: UserSafeDto, postId: number) {
    const dbPost = await PostService.getPostById(postId);
    const dbLike = await this.likeRepository.getLikeByUser(dbPost.id, user.id);
    if (!dbLike) {
      return this.likeRepository.addPostLike(dbPost, user);
    }
    return this.likeRepository.deletePostLike(dbLike);
  }

  public async getPostLikesCount(postId: number) {
    const dbPost = await PostService.getPostById(postId);
    const likes = await this.likeRepository.getLikesByPost(dbPost);
    return likes.length;
  }
}

export default new LikeService(PgLikeRepository);
