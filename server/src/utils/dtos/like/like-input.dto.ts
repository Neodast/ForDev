import UserSafeDto from '../users/user-safe.dto';

type LikeInputDto = {
  user: UserSafeDto;
  postId: number;
};

export default LikeInputDto;
