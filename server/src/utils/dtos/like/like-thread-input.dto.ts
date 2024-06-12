import UserSafeDto from '../users/user-safe.dto';

type LikeThreadInputDto = {
  user: UserSafeDto;
  threadId: number;
};

export default LikeThreadInputDto;
