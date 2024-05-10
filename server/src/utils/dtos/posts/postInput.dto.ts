import UserSafeDto from '../users/UserSafe.dto';

interface PostInputDto {
  title: string;
  text: string;
  author: UserSafeDto;
  sectionTitle: string;
}

export default PostInputDto;
