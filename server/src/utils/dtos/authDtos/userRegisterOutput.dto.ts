import RefreshTokenDto from '../tokenDtos/refreshToken.dto';
import UserCreateDto from '../userDtos/userCreate.dto';

export default interface UserRegisterDto {
  tokens: RefreshTokenDto;
  user: UserCreateDto;
}
