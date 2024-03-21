import CommentMaper from '../../../core/mappers/commentMapper';
import CommentModel from '../../../core/models/commentModel';
import { Comment } from '../../entities/commentEntity';
import PgUserMapper from './pgUserMappers';

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
