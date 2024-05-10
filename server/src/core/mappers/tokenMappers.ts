import RefreshStringDto from '../../utils/dtos/tokens/RefreshString.dto';
import TokenModel from '../models/TokenModel';

class TokenMapper {
  public static mapToRefreshStringDto(token: TokenModel): RefreshStringDto {
    return {
      refreshToken: token.refreshToken,
    };
  }
}

export default TokenMapper;
