import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import LikeModel from '../models/like.model';
import PostModel from '../models/post.model';

type LikeRepository = {
  //getLikesCount(itemId: string): Promise<number>;//TODO make this method, it`s better like 3 or more methods down
  getLikesByPost(postId: number): Promise<LikeModel[]>;
  getLikeByUser(postId: number, userId: string): Promise<LikeModel | null>;
  addPostLike(postData: PostModel, userData: UserSafeDto): Promise<LikeModel>;
  deletePostLike(like: LikeModel): Promise<void>;
};

export default LikeRepository;
