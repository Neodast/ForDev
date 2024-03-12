import RefreshStringDto from '../tokenDtos/refreshString.dto';
import UserCreateDto from '../userDtos/userCreate.dto';

export default interface UserRegisterDto {
  tokens: RefreshStringDto;
  user: UserCreateDto;
}
