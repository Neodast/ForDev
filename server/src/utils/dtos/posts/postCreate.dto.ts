import SectionModel from '../../../core/models/SectionModel';
import UserSafeDto from '../users/UserSafe.dto';

interface PostCreateDto {
  title: string;
  text: string;
  author: UserSafeDto;
  likes: number;

  section: SectionModel;
}

export default PostCreateDto;
