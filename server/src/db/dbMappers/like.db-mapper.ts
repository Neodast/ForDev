import LikeMapper from '../../core/mappers/like.mapper';
import LikeModel from '../../core/models/like.model';
import { Like } from '../entities/like.entity';
import PgUserMapper from './user.db-mapper';

class PgLikeMapper extends LikeMapper {
  public static mapToLikeModel(like: Like): LikeModel {
    return {
      id: like.id,
      user: PgUserMapper.mapToUserSafeDto({ ...like.user }),
    };
  }
}

export default PgLikeMapper;
