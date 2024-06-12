import { inject, injectable } from 'inversify';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import LikeRepository from '../repositories/like.repository.type';
import { PostService } from './post.service';
import { LikeTypes } from '../../utils/types/containers/like.types';
import { PostTypes } from '../../utils/types/containers/post.types';
import { ThreadTypes } from '../../utils/types/containers/thread.types';
import { ThreadService } from './thread.service';

@injectable()
export class LikeService {
  constructor(
    @inject(LikeTypes.LikeRepository) private likeRepository: LikeRepository,
    @inject(PostTypes.PostService) private postService: PostService,
    @inject(ThreadTypes.ThreadService) private threadService: ThreadService,
  ) {}

  public async likePost(user: UserSafeDto, postId: number) {
    const dbPost = await this.postService.getPostById(postId);
    const dbLike = await this.likeRepository.getPostLikeByUser(dbPost.id, user.id);
    if (!dbLike) {
      return this.likeRepository.addPostLike(dbPost, user);
    }
    return this.likeRepository.deleteLike(dbLike);
  }

  public async likeThread(user: UserSafeDto, threadId:number) {
    const dbThread = await this.threadService.getThreadById(threadId);
    const dbLike = await this.likeRepository.getPostLikeByUser(dbThread.id, user.id);
    if(!dbLike) {
      return this.likeRepository.addThreadLike(dbThread, user);
    }
    return this.likeRepository.deleteLike(dbLike);
  }

  public async getPostLikesCount(postId: number): Promise<number> {
    const likes = await this.likeRepository.getLikesByPost(postId);
    return likes.length;
  }

  public async getThreadLikesCount(threadId: number): Promise<number> {
    const likes = await this.likeRepository.getLikesByThread(threadId);
    return likes.length;
  }
}
