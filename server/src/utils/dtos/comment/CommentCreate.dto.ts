import PostModel from '../../../core/models/PostModel';
import ThreadModel from '../../../core/models/ThreadModel';
import UserSafeDto from '../users/UserSafe.dto';

type CommentCreateDto = {
  author: UserSafeDto;
  text: string;
  post?: PostModel;
  thread?: ThreadModel;
}

export default CommentCreateDto;