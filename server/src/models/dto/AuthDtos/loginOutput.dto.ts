import TokensOutputDto from '../TokenDtos/tokensOutput.dto';
import UserDto from '../UserDtos/user.dto';

export default interface LoginOutputDto {
  user: UserDto;
  tokens: TokensOutputDto;
}
