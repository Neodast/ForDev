import UserSafeDto from '../../users/UserSafe.dto'

type LikeInputDto = {
  user: UserSafeDto,
  postId: number;
}

export default LikeInputDto;