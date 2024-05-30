import PostItem from './interfaces/post-item.type';

type QuizModel = PostItem & {
  question: string;
  answers: string[];
  rightAnswer?: string;
};

export default QuizModel;
