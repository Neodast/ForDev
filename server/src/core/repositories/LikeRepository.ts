import UserSafeDto from '../../utils/dtos/users/UserSafe.dto';
import LikeModel from '../models/LikeModel';
import PostModel from '../models/PostModel';

type LikeRepository = {
  //getLikesCount(itemId: string): Promise<number>;//TODO make this method, it`s better like 3 or more methods down
  getLikesByPost(post: PostModel): Promise<LikeModel[]>;
  getLikeByUser(postId: number, userId: string) : Promise<LikeModel | null>;
  addPostLike(postData: PostModel, userData: UserSafeDto): Promise<LikeModel>;
  deletePostLike(like: LikeModel): Promise<void>;
};

export default LikeRepository;
