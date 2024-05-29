import SectionModel from '../../../core/models/section.model';
import UserSafeDto from '../users/user-safe.dto';

interface PostCreateDto {
  title: string;
  text: string;
  author: UserSafeDto;
  section: SectionModel;
}

export default PostCreateDto;
