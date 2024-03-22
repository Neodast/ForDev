import ThreadMapper from '../../../core/mappers/threadMapper';
import UserMapper from '../../../core/mappers/userMappers';
import ThreadModel from '../../../core/models/threadModel';
import { Thread } from '../../entities/threadEntity';
import PgCommentMapper from './pgCommentMapper';

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
    };
  }
}

export default PgThreadMapper;
