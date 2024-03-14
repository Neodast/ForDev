import RefreshStringDto from '../tokenDtos/refreshString.dto';
import UserCreateDto from '../userDtos/userCreate.dto';

interface UserRegisterDto {
  tokens: RefreshStringDto;
  user: UserCreateDto;
}

export default UserRegisterDto;
