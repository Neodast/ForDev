import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import LikeModel from './like.model';

type CommentModel = {
  id: number;
  author: UserSafeDto;
  text: string;
  likes?: LikeModel[];
};

export default CommentModel;
