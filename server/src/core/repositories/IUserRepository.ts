import UserDto from '../../utils/dtos/userDtos/user.dto';
import UserCreateDto from '../../utils/dtos/userDtos/userCreate.dto';
import UserModelDto from '../models/userModel';

interface IUserRepository {
  getById(id: string): Promise<UserModelDto>;
  getByEmail(email: string): Promise<UserModelDto>;
  getAll(): Promise<Array<UserCreateDto>>;
  createUser(user: UserCreateDto): Promise<UserDto>;
  deleteUser(user: UserCreateDto): Promise<void>;
  updateUser(id: string, newData: UserModelDto): Promise<UserDto>;
}

export default IUserRepository;
