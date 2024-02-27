import RefreshTokenDto from '../TokenDtos/refreshToken.dto';
import UserCreateDto from '../UserDtos/userCreate.dto';

export default interface UserRegisterDto {
  tokens: RefreshTokenDto;
  user: UserCreateDto;
}
