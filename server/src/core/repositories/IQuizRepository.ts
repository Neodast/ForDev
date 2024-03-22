import UserSafeDto from '../../utils/dtos/userDtos/userSafe.dto';
import QuizModel from '../models/quizModel';

interface IQuizRepository {
  getById(id: number): Promise<QuizModel>;
  getByAuthor(author: UserSafeDto): Promise<QuizModel[]>;
  getAll(): Promise<QuizModel[]>;
  createQuiz(quizData: QuizModel): Promise<QuizModel>;
  updateQuiz(id: number, newQuizData: QuizModel): Promise<QuizModel>;
  deleteQuiz(quiz: QuizModel): Promise<void>;
}

export default IQuizRepository;