import CommentMaper from '../../../core/mappers/CommentMapper';
import CommentModel from '../../../core/models/CommentModel';
import { Comment } from '../../entities/CommentEntity';
import PgUserMapper from './PgUserMappers';

class PgCommentMapper extends CommentMaper {
  public static mapToCommentModel(comment: Comment): CommentModel {
    return {
      id: comment.id,
      author: PgUserMapper.mapToUserModel(comment.author),
      likes: comment.likes,
      text: comment.text,
    };
  }
}

export default PgCommentMapper;
