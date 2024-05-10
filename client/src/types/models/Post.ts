import User from './User';

type Post = {
  id: number;
  title: string;
  likes: number;
  text: string;
  author: User;
  // comments: CommentModel[];
  // section: Section;
};

export default Post;
