import Comment from './Comment';
import Like from './Like';
import User from './User';

type Post = {
  id: number;
  title: string;
  likes: Like[];
  text: string;
  author: User;
  comments: Comment[];
  // section: Section;
};

export default Post;
