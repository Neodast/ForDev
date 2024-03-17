import PostMapper from '../../../core/mappers/postMapper';
import PostModel from '../../../core/models/postModel';
import { Post } from '../../entities/postEntity';
import PgUserMapper from './pgUserMappers';

class PgPostMapper extends PostMapper {
  public static mapToPostModel(post: Post): PostModel {
    return {
      id: post.id,
      author: PgUserMapper.mapToUserSafeDto(post.author),
      title: post.title,
      text: post.text,
      likes: post.likes,
      comments: post.comments,
    };
  }
}

export default PgPostMapper;
