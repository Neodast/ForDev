import Like from './Like';
import User from './User';

type Comment = {
  id: number;
  text: string;
  author: User;
  likes?: Like[];
}

export default Comment;
