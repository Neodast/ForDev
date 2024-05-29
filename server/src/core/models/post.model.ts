import PostItem from './interfaces/post-item.type';

type PostModel = PostItem & {
  // image?;
  text: string;
};

export default PostModel;
