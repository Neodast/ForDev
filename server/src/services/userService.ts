import { Repository } from 'typeorm';
import appDataSource from '../appDataSourse';
import { User } from '../models/userEntity';
import UserCreateDto from '../models/dto/userCreate.dto';
import ApiError from '../utils/exeptions/apiError';
import UserDto from '../models/dto/user.dto';

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  async getById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User is not found');
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  async getAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async create(user: UserCreateDto) {
    const newUser = this.userRepository.create(user);

    const createdUser = await this.userRepository.save(newUser);

    return createdUser;
  }

  async verify(id: string) {
    const user = await this.getById(id);

    if (!user) {
      throw ApiError.BadRequest('User is not verify');
    }

    user.isVerified = true;

    await this.userRepository.save(user);
  }
}

export default new UserService();
