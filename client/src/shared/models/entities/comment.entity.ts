import { Like } from './like.entity';
import { User } from './user.entity';

export type Comment = {
  id: number;
  text: string;
  author: User;
  likes?: Like[];
};
