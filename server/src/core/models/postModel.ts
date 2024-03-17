import UserSafeDto from '../../utils/dtos/userDtos/userSafe.dto';
import CommentModel from './commentModel';

interface PostModel {
  id: number;
  author: UserSafeDto;
  title: string;
  text: string;
  likes: number;
  comments: CommentModel[];
}

export default PostModel;