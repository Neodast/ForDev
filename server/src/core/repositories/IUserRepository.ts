import UserSafeDto from '../../utils/dtos/userDtos/userSafe.dto';
import UserCreateDto from '../../utils/dtos/userDtos/userCreate.dto';
import UserModel from '../models/userModel';

interface IUserRepository {
  getById(id: string): Promise<UserModel>;
  getByEmail(email: string): Promise<UserModel>;
  getAll(): Promise<UserCreateDto[]>;
  createUser(user: UserCreateDto): Promise<UserSafeDto>;
  updateUser(id: string, newUserData: UserModel): Promise<UserSafeDto>;
  deleteUser(user: UserCreateDto): Promise<void>;
}

export default IUserRepository;
