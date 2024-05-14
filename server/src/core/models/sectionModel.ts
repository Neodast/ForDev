import PostModel from './PostModel';
import QuizModel from './QuizModel';
import ThreadModel from './ThreadModel';

type SectionModel = {
  id: number;
  title: string;
  posts: PostModel[];
  quizzes: QuizModel[];
  threads: ThreadModel[];
}

export default SectionModel;
