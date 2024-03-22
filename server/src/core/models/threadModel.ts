import IPost from './interfaces/IPost';

interface ThreadModel extends IPost {
  text: string;
}

export default ThreadModel;