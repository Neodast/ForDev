import { Post } from './post.entity';

export type Section = {
  id: number;
  title: string;
  posts: Post[];
  // quizzes: QuizModel[];
  // threads: ThreadModel[];
};
