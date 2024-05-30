import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import UserCreateDto from '../../utils/dtos/users/user-create.dto';
import UserModel from '../models/user.model';

type UserRepository = {
  getById(id: string): Promise<UserModel>;
  getByEmail(email: string): Promise<UserModel>;
  getAll(): Promise<UserCreateDto[]>;
  createUser(user: UserCreateDto): Promise<UserSafeDto>;
  updateUser(id: string, newUserData: UserModel): Promise<UserSafeDto>;
  deleteUser(user: UserCreateDto): Promise<void>;
};

export default UserRepository;
