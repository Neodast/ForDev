import UserSafeDto from '../../utils/dtos/userDtos/user.dto';
import UserCreateDto from '../../utils/dtos/userDtos/userCreate.dto';
import UserModel from '../models/userModel';

interface IUserRepository {
  getById(id: string): Promise<UserModel>;
  getByEmail(email: string): Promise<UserModel>;
  getAll(): Promise<Array<UserCreateDto>>;
  createUser(user: UserCreateDto): Promise<UserSafeDto>;
  deleteUser(user: UserCreateDto): Promise<void>;
  updateUser(id: string, newData: UserModel): Promise<UserSafeDto>;
}

export default IUserRepository;
