import { Comment } from './comment.entity';
import { Like } from './like.entity';
import { User } from './user.entity';

export type Post = {
  id: number;
  title: string;
  likes: Like[];
  text: string;
  author: User;
  comments: Comment[];
  sectionTitle: string;
  imageLink: string;
  creationDate: Date;
};
