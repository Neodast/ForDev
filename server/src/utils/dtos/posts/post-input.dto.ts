import UserSafeDto from '../users/user-safe.dto';

interface PostInputDto {
  title: string;
  text: string;
  image: Express.Multer.File;
  author: UserSafeDto;
  sectionTitle: string;
}

export default PostInputDto;
