import TokensOutputDto from '../tokens/tokensOutput.dto';
import UserSafeDto from '../users/userSafe.dto';

interface LoginOutputDto {
  user: UserSafeDto;
  tokens: TokensOutputDto;
}

export default LoginOutputDto;
