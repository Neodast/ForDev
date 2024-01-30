import TokensOutputDto from './tokensOutput.dto';
import UserDto from './user.dto';

export default interface LoginOutputDto {
  user: UserDto;
  tokens: TokensOutputDto;
}
