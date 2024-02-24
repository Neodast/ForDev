import UserDto from '../models/dto/user.dto';
import UserCreateDto from '../models/dto/userCreate.dto';

interface IUserRepository {
  userRepository: any;
  findUser(criteria: Record<string, any>): Promise<UserDto>;
  getById(id: string) : Promise<UserDto>;
  getByEmail(email: string) : Promise<UserDto>;
  getAll() : Promise<Array<UserDto>>;
  createUser(user: UserCreateDto) : Promise<UserDto>;
  deleteUser(user: UserCreateDto) : Promise<void>;
  updateUser() : Promise<UserDto>;
  verify() : Promise<void>;
}

export default IUserRepository;
