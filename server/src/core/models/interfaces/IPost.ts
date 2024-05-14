import { Section } from '../../../db/entities/postgreSQL/SectionEntity';
import UserSafeDto from '../../../utils/dtos/users/UserSafe.dto';
import CommentModel from '../CommentModel';
import LikeModel from '../LikeModel';

interface IPost {
  id: number;
  title: string;
  likes: LikeModel[];
  author: UserSafeDto;
  comments: CommentModel[];
  section: Section;
}

export default IPost;
