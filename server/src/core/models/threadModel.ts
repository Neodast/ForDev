import IPost from './interfaces/IPost';

type ThreadModel = IPost & {
  text: string;
};

export default ThreadModel;
