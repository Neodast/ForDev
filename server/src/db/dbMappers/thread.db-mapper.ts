import ThreadMapper from '../../core/mappers/thread.mapper';
import UserMapper from '../../core/mappers/user.mapper';
import ThreadModel from '../../core/models/thread.model';
import { Thread } from '../entities/thread.entity';
import PgCommentMapper from './comment.db-mapper';

class PgThreadMapper extends ThreadMapper {
  public static mapToThreadModel(thread: Thread): ThreadModel {
    return {
      id: thread.id,
      author: UserMapper.mapToUserSafeDto(thread.author),
      title: thread.title,
      text: thread.text,
      likes: thread.likes,
      comments: thread.comments.map((comment) =>
        PgCommentMapper.mapToCommentModel(comment),
      ),
      section: thread.section,
    };
  }
}

export default PgThreadMapper;
