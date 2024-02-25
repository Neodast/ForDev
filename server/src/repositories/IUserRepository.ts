import UserDto from '../models/dto/user.dto';
import UserCreateDto from '../models/dto/userCreate.dto';

interface IUserRepository {
  getById(id: string) : Promise<UserDto>;
  getByEmail(email: string) : Promise<UserDto>;
  getAll() : Promise<Array<UserDto>>;
  createUser(user: UserCreateDto) : Promise<UserDto>;
  deleteUser(user: UserCreateDto) : Promise<void>;
  updateUser(user: UserDto, newUser: UserCreateDto) : Promise<UserDto>;
  verify(id: string) : Promise<UserDto>;
}

export default IUserRepository;
