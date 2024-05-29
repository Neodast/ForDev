import TokensOutputDto from '../tokens/token-output.dto';
import UserSafeDto from '../users/user-safe.dto';

interface LoginOutputDto {
  user: UserSafeDto;
  tokens: TokensOutputDto;
}

export default LoginOutputDto;
