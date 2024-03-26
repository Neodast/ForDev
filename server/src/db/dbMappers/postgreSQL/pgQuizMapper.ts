import QuizMapper from '../../../core/mappers/quizMapper';
import UserMapper from '../../../core/mappers/userMappers';
import QuizModel from '../../../core/models/quizModel';
import { Quiz } from '../../entities/quizEntity';
import PgCommentMapper from './pgCommentMapper';

class PgQuizMapper extends QuizMapper {
  public static mapToQuizModel(quiz: Quiz): QuizModel {
    return {
      id: quiz.id,
      author: UserMapper.mapToUserSafeDto(quiz.author),
      title: quiz.title,
      question: quiz.question,
      answers: quiz.answers,
      rightAnswer: quiz.rightAnswer,
      likes: quiz.likes,
      comments: quiz.comments.map((comment) =>
        PgCommentMapper.mapToCommentModel(comment),
      ),
      section: quiz.section,
    };
  }
}

export default PgQuizMapper;
