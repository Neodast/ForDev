import PostModel from './post.model';
import ThreadModel from './thread.model';

type SectionModel = {
  id: number;
  title: string;
  posts: PostModel[];
  threads: ThreadModel[];
};

export default SectionModel;
