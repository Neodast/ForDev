import PostModel from './PostModel';
import QuizModel from './QuizModel';
import ThreadModel from './ThreadModel';

interface SectionModel {
  id: number;
  title: string;
  posts: PostModel[];
  quizzes: QuizModel[];
  threads: ThreadModel[];
}

export default SectionModel;
