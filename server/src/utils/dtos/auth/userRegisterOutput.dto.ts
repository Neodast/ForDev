import RefreshStringDto from '../tokens/refreshString.dto';
import UserCreateDto from '../users/userCreate.dto';

interface UserRegisterDto {
  tokens: RefreshStringDto;
  user: UserCreateDto;
}

export default UserRegisterDto;
