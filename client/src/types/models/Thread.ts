import Comment from './Comment';
import Like from './Like';
import User from './User';

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
