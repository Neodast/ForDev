import UserDto from '../models/dto/user.dto';
import UserCreateDto from '../models/dto/userCreate.dto';
import UserModelDto from '../models/dto/userModel.dto';

interface IUserRepository {
  getById(id: string): Promise<UserModelDto>;
  getByEmail(email: string): Promise<UserModelDto>;
  getAll(): Promise<Array<UserDto>>;
  createUser(user: UserCreateDto): Promise<UserDto>;
  deleteUser(user: UserCreateDto): Promise<void>;
  updateUser(id: string, newData: UserModelDto): Promise<UserDto>;
}

export default IUserRepository;
