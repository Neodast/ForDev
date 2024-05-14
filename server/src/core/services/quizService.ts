import pgQuizRepository from '../../db/dbRepositories/postgreSQL/PgQuizRepository';
import QuizModel from '../models/QuizModel';
import QuizRepository from '../repositories/QuizRepository';

class QuizService {
  constructor(readonly quizRepository: QuizRepository) {}

  public async createQuiz(quizData: QuizModel): Promise<QuizModel> {
    return this.quizRepository.createQuiz(quizData);
  }

  public async deleteQuiz(quiz: QuizModel): Promise<void> {
    const dbPost = await this.quizRepository.getById(quiz.id);
    return this.quizRepository.deleteQuiz(dbPost);
  }

  public async getAllQuizzes(): Promise<QuizModel[]> {
    return this.quizRepository.getAll();
  }
}

export default new QuizService(pgQuizRepository);
