import UserSafeDto from '../users/userSafe.dto';

interface PostInputDto {
  title: string;
  text: string;
  author: UserSafeDto;
  sectionTitle: string;
}

export default PostInputDto;