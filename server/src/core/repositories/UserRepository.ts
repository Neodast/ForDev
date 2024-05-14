import UserSafeDto from '../../utils/dtos/users/UserSafe.dto';
import UserCreateDto from '../../utils/dtos/users/UserCreate.dto';
import UserModel from '../models/UserModel';

type UserRepository = {
  getById(id: string): Promise<UserModel>;
  getByEmail(email: string): Promise<UserModel>;
  getAll(): Promise<UserCreateDto[]>;
  createUser(user: UserCreateDto): Promise<UserSafeDto>;
  updateUser(id: string, newUserData: UserModel): Promise<UserSafeDto>;
  deleteUser(user: UserCreateDto): Promise<void>;
};

export default UserRepository;
