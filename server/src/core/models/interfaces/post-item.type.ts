import { Section } from '../../../db/entities/section.entity';
import UserSafeDto from '../../../utils/dtos/users/user-safe.dto';
import CommentModel from '../comment.model';
import LikeModel from '../like.model';

type PostItem = {
  id: number;
  title: string;
  likes: LikeModel[];
  author: UserSafeDto;
  comments: CommentModel[];
  section: Section;
};

export default PostItem;
