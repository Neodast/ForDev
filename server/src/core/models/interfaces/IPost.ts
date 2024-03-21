import UserSafeDto from '../../../utils/dtos/userDtos/userSafe.dto';
import CommentModel from '../commentModel';

interface IPost {
  id: number;
  title: string;
  likes: number;
  author: UserSafeDto;
  comments: CommentModel[];
}

export default IPost;
