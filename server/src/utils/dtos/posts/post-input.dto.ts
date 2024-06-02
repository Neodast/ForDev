import UserSafeDto from '../users/user-safe.dto';

interface PostInputDto {
  title: string;
  text: string;
  image: Express.Multer.File;
  authorId: string;
  sectionTitle: string;
}

export default PostInputDto;
