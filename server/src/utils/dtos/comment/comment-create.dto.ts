import PostModel from '../../../core/models/post.model';
import ThreadModel from '../../../core/models/thread.model';
import UserSafeDto from '../users/user-safe.dto';

type CommentCreateDto = {
  author: UserSafeDto;
  text: string;
  post?: PostModel;
  thread?: ThreadModel;
};

export default CommentCreateDto;
