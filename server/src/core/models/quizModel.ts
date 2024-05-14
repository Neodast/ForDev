import IPost from './interfaces/IPost';

type QuizModel = IPost & {
  question: string;
  answers: string[];
  rightAnswer?: string;
}

export default QuizModel;
