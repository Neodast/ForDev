import { inject, injectable } from 'inversify';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import LikeRepository from '../repositories/like.repository.type';
import { PostService } from './post.service';
import { LikeTypes } from '../../utils/types/containers/like.types';
import { PostTypes } from '../../utils/types/containers/post.types';

@injectable()
export class LikeService {
  constructor(
    @inject(LikeTypes.LikeRepository) private likeRepository: LikeRepository,
    @inject(PostTypes.PostService) private postService: PostService,
  ) {}

  public async likePost(user: UserSafeDto, postId: number) {
    const dbPost = await this.postService.getPostById(postId);
    const dbLike = await this.likeRepository.getLikeByUser(dbPost.id, user.id);
    if (!dbLike) {
      return this.likeRepository.addPostLike(dbPost, user);
    }
    return this.likeRepository.deletePostLike(dbLike);
  }

  public async getPostLikesCount(postId: number): Promise<number> {
    const likes = await this.likeRepository.getLikesByPost(postId);
    return likes.length;
  }
}
