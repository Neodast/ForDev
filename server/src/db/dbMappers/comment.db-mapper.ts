import CommentMaper from '../../core/mappers/comment.mapper';
import CommentModel from '../../core/models/comment.model';
import { Comment } from '../entities/comment.entity';
import PgUserMapper from './user.db-mapper';

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
