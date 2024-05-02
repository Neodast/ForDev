import PostMapper from '../../../core/mappers/postMapper';
import UserMapper from '../../../core/mappers/userMappers';
import PostModel from '../../../core/models/postModel';
import { Post } from '../../entities/postEntity';
import PgCommentMapper from './pgCommentMapper';

class PgPostMapper extends PostMapper {
  public static mapToPostModel(post: Post): PostModel {
    return {
      id: post.id,
      author: UserMapper.mapToUserSafeDto(post.author),
      title: post.title,
      text: post.text,
      likes: post.likes,
      comments: post.comments.map((comment) =>
        PgCommentMapper.mapToCommentModel(comment),
      ) || [],
      section: post.section,
    };
  }
}

export default PgPostMapper;
