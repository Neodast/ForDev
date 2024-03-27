import { Repository } from 'typeorm';
import { Quiz } from '../../entities/quizEntity';
import appDataSource from '../../appDataSourse';
import QuizMapper from '../../dbMappers/postgreSQL/pgQuizMapper';
import UserSafeDto from '../../../utils/dtos/userDtos/userSafe.dto';
import ApiError from '../../../utils/exeptions/apiError';
import QuizModel from '../../../core/models/quizModel';
import IQuizRepository from '../../../core/repositories/IQuizRepository';

class PgQuizRepository implements IQuizRepository {
  private readonly quizRepository: Repository<Quiz>;

  constructor() {
    this.quizRepository = appDataSource.getRepository(Quiz);
  }

  private async findQuiz(criteria: Record<string, unknown>): Promise<Quiz> {
    const dbQuiz = await this.quizRepository.findOne({
      where: criteria,
      relations: ['author', 'comments', 'comments.author'],
    });
    if (!dbQuiz) {
      throw new Error('Quiz is not found!');
    }
    return dbQuiz;
  }

  private async findQuizzes(
    criteria?: Record<string, unknown>,
  ): Promise<Quiz[]> {
    const dbQuizzes = await this.quizRepository.find({
      where: criteria,
      relations: ['author', 'comments', 'comments.author'],
    });
    if (!dbQuizzes.length) {
      throw new Error('Quizzes are not found!');
    }
    return dbQuizzes;
  }

  public async getById(id: number): Promise<QuizModel> {
    return QuizMapper.mapToQuizModel(await this.findQuiz({ id }));
  }

  public async getByAuthor(author: UserSafeDto): Promise<QuizModel[]> {
    return (await this.findQuizzes({author})).map((dbQuiz) =>
    QuizMapper.mapToQuizModel(dbQuiz),
  );
  }

  public async getAll(): Promise<QuizModel[]> {
    return (await this.findQuizzes()).map((dbQuiz) =>
      QuizMapper.mapToQuizModel(dbQuiz),
    );
  }

  public async createQuiz(QuizData: QuizModel): Promise<QuizModel> {
    if (!QuizData) {
      throw ApiError.BadRequest('Quiz is undefined!');
    }
    const quiz = this.quizRepository.create(QuizData);
    return QuizMapper.mapToQuizModel(await this.quizRepository.save(quiz));
  }

  public async updateQuiz(
    id: number,
    newQuizData: QuizModel,
  ): Promise<QuizModel> {
    const dbQuiz = await this.getById(id);
    Object.assign(dbQuiz, newQuizData);
    return QuizMapper.mapToQuizModel(await this.quizRepository.save(dbQuiz));
  }

  public async deleteQuiz(quiz: QuizModel): Promise<void> {
    const dbQuiz = await this.findQuiz({ quiz });
    await this.quizRepository.remove(dbQuiz);
  }
}

export default new PgQuizRepository();
