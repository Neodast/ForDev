import TokensOutputDto from '../tokenDtos/tokensOutput.dto';
import UserSafeDto from '../userDtos/user.dto';

export default interface LoginOutputDto {
  user: UserSafeDto;
  tokens: TokensOutputDto;
}
