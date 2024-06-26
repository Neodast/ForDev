import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import QuizModel from '../models/quiz.model';

type QuizRepository = {
  getById(id: number): Promise<QuizModel>;
  getByAuthor(author: UserSafeDto): Promise<QuizModel[]>;
  getAll(): Promise<QuizModel[]>;
  createQuiz(quizData: QuizModel): Promise<QuizModel>;
  updateQuiz(id: number, newQuizData: QuizModel): Promise<QuizModel>;
  deleteQuiz(quiz: QuizModel): Promise<void>;
};

export default QuizRepository;
