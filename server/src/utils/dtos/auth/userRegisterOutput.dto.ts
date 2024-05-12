import RefreshStringDto from '../tokens/RefreshString.dto';
import UserCreateDto from '../users/UserCreate.dto';

interface UserRegisterDto {
  tokens: RefreshStringDto;
  user: UserCreateDto;
}

export default UserRegisterDto;
