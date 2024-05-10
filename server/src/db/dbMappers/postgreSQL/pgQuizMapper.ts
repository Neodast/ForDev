import QuizMapper from '../../../core/mappers/QuizMapper';
import UserMapper from '../../../core/mappers/UserMappers';
import QuizModel from '../../../core/models/QuizModel';
import { Quiz } from '../../entities/QuizEntity';
import PgCommentMapper from './PgCommentMapper';

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
