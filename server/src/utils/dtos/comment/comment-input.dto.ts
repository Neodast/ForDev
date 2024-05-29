import UserSafeDto from '../users/user-safe.dto';

type CommentInputDto = {
  author: UserSafeDto;
  text: string;
  postId: number;
};

export default CommentInputDto;
