import TokenMapper from '../../../core/mappers/tokenMappers';
import TokenModel from '../../../core/models/tokenModel';
import { Token } from '../../entities/tokenEntity';

class PgTokenMapper extends TokenMapper {
  public static mapToTokenModel(token: Token): TokenModel {
    return {
      id: token.id,
      refreshToken: token.refreshToken,
    }
  }

}

export default PgTokenMapper;