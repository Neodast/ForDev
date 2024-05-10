import Post from './Post';

type Section = {
  id: number;
  title: string;
  posts: Post[];
  // quizzes: QuizModel[];
  // threads: ThreadModel[];
}

export default Section;
