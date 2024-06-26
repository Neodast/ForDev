import PostMapper from '../../core/mappers/post.mapper';
import UserMapper from '../../core/mappers/user.mapper';
import PostModel from '../../core/models/post.model';
import { Post } from '../entities/post.entity';
import PgCommentMapper from './comment.db-mapper';

class PgPostMapper extends PostMapper {
  public static mapToPostModel(post: Post): PostModel {
    //TODO rewrite all to authorId
    return {
      id: post.id,
      author: UserMapper.mapToUserSafeDto(post.author),
      title: post.title,
      text: post.text,
      likes: post.likes,
      imageLink: post.imageLink,
      creationDate: post.creationDate,
      comments:
        post.comments.map((comment) =>
          PgCommentMapper.mapToCommentModel(comment),
        ) || [],
      section: post.section,
    };
  }
}

export default PgPostMapper;
