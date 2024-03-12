import TokensOutputDto from '../tokenDtos/tokensOutput.dto';
import UserDto from '../userDtos/user.dto';

export default interface LoginOutputDto {
  user: UserDto;
  tokens: TokensOutputDto;
}
