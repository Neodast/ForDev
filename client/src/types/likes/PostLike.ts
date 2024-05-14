import User from '../models/User';

type PostLike = {
  postId: string;
  user: User;
}

export default PostLike;