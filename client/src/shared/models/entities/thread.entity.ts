import { Like } from './like.entity';
import { User } from './user.entity';

export type ThreadModel = {
  id: number;
  title: string;
  likes: Like[];
  text: string;
  author: User;
  comments: Comment[];
  sectionTitle: string;
  creationDate: Date;
};
