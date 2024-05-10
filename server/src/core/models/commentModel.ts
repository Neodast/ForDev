import UserSafeDto from '../../utils/dtos/users/UserSafe.dto';

interface CommentModel {
  id: number;
  author: UserSafeDto;
  text: string;
  likes: number;
}

export default CommentModel;
