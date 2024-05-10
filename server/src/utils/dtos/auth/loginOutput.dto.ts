import TokensOutputDto from '../tokens/TokensOutput.dto';
import UserSafeDto from '../users/UserSafe.dto';

interface LoginOutputDto {
  user: UserSafeDto;
  tokens: TokensOutputDto;
}

export default LoginOutputDto;
