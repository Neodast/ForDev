import UserSafeDto from '../users/UserSafe.dto';

type CommentInputDto = {
  author: UserSafeDto;
  text: string;
  postId: number;
};

export default CommentInputDto;
