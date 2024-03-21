import IPost from './interfaces/IPost';

interface PostModel extends IPost {
  // image?: ImageBitmap;
  text: string;
}

export default PostModel;
