import LikeMapper from '../../../core/mappers/LikeMapper';
import LikeModel from '../../../core/models/LikeModel';
import { Like } from '../../entities/postgreSQL/LikeEntity';
import PgUserMapper from './PgUserMappers';

class PgLikeMapper extends LikeMapper {
  public static mapToLikeModel(like: Like) : LikeModel {
    return {
      id: like.id,
      user: PgUserMapper.mapToUserSafeDto({...like.user}),
    }
  }
}

export default PgLikeMapper