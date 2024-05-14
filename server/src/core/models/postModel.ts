import IPost from './interfaces/IPost';

type PostModel = IPost & {
  // image?;
  text: string;
}

export default PostModel;
