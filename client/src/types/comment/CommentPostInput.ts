import User from '../models/User';

type CommentPostInput = {
  text: string;
  author: User;
  postId: number;
}

export default CommentPostInput;