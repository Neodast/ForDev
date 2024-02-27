import UserDto from '../models/dto/UserDtos/user.dto';
import UserCreateDto from '../models/dto/UserDtos/userCreate.dto';
import UserModelDto from '../models/dto/UserDtos/userModel.dto';

interface IUserRepository {
  getById(id: string): Promise<UserModelDto>;
  getByEmail(email: string): Promise<UserModelDto>;
  getAll(): Promise<Array<UserDto>>;
  createUser(user: UserCreateDto): Promise<UserDto>;
  deleteUser(user: UserCreateDto): Promise<void>;
  updateUser(id: string, newData: UserModelDto): Promise<UserDto>;
}

export default IUserRepository;
