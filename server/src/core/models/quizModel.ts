import IPost from './interfaces/IPost';

interface QuizModel extends IPost {
  question: string;
  answers: string[];
  rightAnswer?: string;
}

export default QuizModel;
