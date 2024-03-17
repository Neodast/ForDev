import UserSafeDto from '../../utils/dtos/userDtos/userSafe.dto';
import PostModel from './postModel';

interface CommentModel {
  id: number;
  post: PostModel;
  author: UserSafeDto;
  text: string;
  likes: number;
}

export default CommentModel;