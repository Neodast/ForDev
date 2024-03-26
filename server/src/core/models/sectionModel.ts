import PostModel from './postModel';
import QuizModel from './quizModel';
import ThreadModel from './threadModel';

interface SectionModel {
  id: number;
  title: string;
  posts: PostModel[];
  quizzes: QuizModel[];
  threads: ThreadModel[];
}

export default SectionModel;