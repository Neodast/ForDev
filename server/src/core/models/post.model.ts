import PostItem from './interfaces/post-item.type';

type PostModel = PostItem & {
  imageLink: string;
  text: string;
};

export default PostModel;
