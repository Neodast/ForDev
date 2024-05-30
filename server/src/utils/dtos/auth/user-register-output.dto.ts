import RefreshStringDto from '../tokens/refresh-string.dto';
import UserCreateDto from '../users/user-create.dto';

interface UserRegisterDto {
  tokens: RefreshStringDto;
  user: UserCreateDto;
}

export default UserRegisterDto;
