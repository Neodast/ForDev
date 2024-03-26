import { Section } from '../../../db/entities/sectionEntity';
import UserSafeDto from '../../../utils/dtos/userDtos/userSafe.dto';
import CommentModel from '../commentModel';

interface IPost {
  id: number;
  title: string;
  likes: number;
  author: UserSafeDto;
  comments: CommentModel[];
  section: Section;
}

export default IPost;
