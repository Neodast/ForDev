import ThreadMapper from '../../../core/mappers/ThreadMapper';
import UserMapper from '../../../core/mappers/UserMappers';
import ThreadModel from '../../../core/models/ThreadModel';
import { Thread } from '../../entities/postgreSQL/ThreadEntity';
import PgCommentMapper from './PgCommentMapper';

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
