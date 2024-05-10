import { Section } from '../../../db/entities/SectionEntity';
import UserSafeDto from '../../../utils/dtos/users/UserSafe.dto';
import CommentModel from '../CommentModel';

interface IPost {
  id: number;
  title: string;
  likes: number;
  author: UserSafeDto;
  comments: CommentModel[];
  section: Section;
}

export default IPost;
