import UserSafeDto from '../../utils/dtos/users/userSafe.dto';

interface CommentModel {
  id: number;
  author: UserSafeDto;
  text: string;
  likes: number;
}

export default CommentModel;
