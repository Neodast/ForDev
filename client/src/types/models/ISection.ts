import IPost from './IPost';

interface ISection {
  id: number;
  title: string;
  posts: IPost[];
  // quizzes: QuizModel[];
  // threads: ThreadModel[];
}

export default ISection;