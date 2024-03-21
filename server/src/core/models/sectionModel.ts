import PostModel from './postModel';
import QuizModel from './quizModel';
import ThreadModel from './threadModel';

interface SectionModel {
  title: string;
  posts: PostModel[];
  quizes: QuizModel[];
  threads: ThreadModel[];
}

export default SectionModel;