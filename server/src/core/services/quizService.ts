import pgQuizRepository from '../../db/dbRepositories/postgreSQL/pgQuizRepository';
import QuizModel from '../models/quizModel';
import IQuizRepository from '../repositories/IQuizRepository';

class QuizService {
  constructor(readonly quizRepository: IQuizRepository) {}

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
