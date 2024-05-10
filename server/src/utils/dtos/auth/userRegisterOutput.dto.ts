import RefreshStringDto from '../tokens/RefreshString.dto';
import UserCreateDto from '../users/CserCreate.dto';

interface UserRegisterDto {
  tokens: RefreshStringDto;
  user: UserCreateDto;
}

export default UserRegisterDto;
