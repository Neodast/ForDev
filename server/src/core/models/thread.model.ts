import PostItem from './interfaces/post-item.type';

type ThreadModel = PostItem & {
  text: string;
};

export default ThreadModel;
