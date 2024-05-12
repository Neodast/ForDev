import TokenMapper from '../../../core/mappers/TokenMappers';
import TokenModel from '../../../core/models/TokenModel';
import { Token } from '../../entities/postgreSQL/TokenEntity';

class PgTokenMapper extends TokenMapper {
  public static mapToTokenModel(token: Token): TokenModel {
    return {
      id: token.id,
      refreshToken: token.refreshToken,
    };
  }
}

export default PgTokenMapper;
