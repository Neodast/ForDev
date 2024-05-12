import PostMapper from '../../../core/mappers/PostMapper';
import UserMapper from '../../../core/mappers/UserMappers';
import PostModel from '../../../core/models/PostModel';
import { Post } from '../../entities/postgreSQL/PostEntity';
import PgCommentMapper from './PgCommentMapper';

class PgPostMapper extends PostMapper {
  public static mapToPostModel(post: Post): PostModel {
    return {
      id: post.id,
      author: UserMapper.mapToUserSafeDto(post.author),
      title: post.title,
      text: post.text,
      likes: post.likes,
      comments:
        post.comments.map((comment) =>
          PgCommentMapper.mapToCommentModel(comment),
        ) || [],
      section: post.section,
    };
  }
}

export default PgPostMapper;
