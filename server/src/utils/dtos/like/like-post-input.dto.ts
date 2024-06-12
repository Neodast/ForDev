import UserSafeDto from '../users/user-safe.dto';

type LikePostInputDto = {
  user: UserSafeDto;
  postId: number;
};

export default LikePostInputDto;
