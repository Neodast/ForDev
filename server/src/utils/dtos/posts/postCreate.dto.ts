import SectionModel from '../../../core/models/sectionModel';
import UserSafeDto from '../users/userSafe.dto';

interface PostCreateDto {
  title: string;
  text: string;
  author: UserSafeDto;
  likes: number;
  
  section: SectionModel;
}

export default PostCreateDto;