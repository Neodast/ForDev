import TokensOutputDto from '../tokenDtos/tokensOutput.dto';
import UserSafeDto from '../userDtos/userSafe.dto';

interface LoginOutputDto {
  user: UserSafeDto;
  tokens: TokensOutputDto;
}

export default LoginOutputDto;
