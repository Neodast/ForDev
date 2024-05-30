import TokenMapper from '../../core/mappers/token,mapper';
import TokenModel from '../../core/models/token.model';
import { Token } from '../entities/token.entity';

class PgTokenMapper extends TokenMapper {
  public static mapToTokenModel(token: Token): TokenModel {
    return {
      id: token.id,
      refreshToken: token.refreshToken,
    };
  }
}

export default PgTokenMapper;
