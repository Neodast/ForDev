import SectionModel from '../../../core/models/SectionModel';
import UserSafeDto from '../users/UserSafe.dto';

interface PostCreateDto {
  title: string;
  text: string;
  author: UserSafeDto;
  section: SectionModel;
}

export default PostCreateDto;
