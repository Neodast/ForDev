import RefreshTokenDto from './refreshToken.dto';
import UserCreateDto from './userCreate.dto';

export default interface UserRegisterDto {
  tokens: RefreshTokenDto;
  user: UserCreateDto;
}
