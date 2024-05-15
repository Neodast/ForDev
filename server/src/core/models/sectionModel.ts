import PostModel from './PostModel';
import ThreadModel from './ThreadModel';

type SectionModel = {
  id: number;
  title: string;
  posts: PostModel[];
  threads: ThreadModel[];
}

export default SectionModel;
