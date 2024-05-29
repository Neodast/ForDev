import RefreshStringDto from '../../utils/dtos/tokens/refresh-string.dto';
import TokenModel from '../models/token.model';

class TokenMapper {
  public static mapToRefreshStringDto(token: TokenModel): RefreshStringDto {
    return {
      refreshToken: token.refreshToken,
    };
  }
}

export default TokenMapper;
