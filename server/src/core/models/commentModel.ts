import UserSafeDto from '../../utils/dtos/users/UserSafe.dto';
import LikeModel from './LikeModel';

type CommentModel = {
  id: number;
  author: UserSafeDto;
  text: string;
  likes: LikeModel[];
}

export default CommentModel;
