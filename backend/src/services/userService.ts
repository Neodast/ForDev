import { Repository } from 'typeorm';
import appDataSource from '../appDataSourse';
import { User } from '../models/userEntity';
import UserDto from '../dto/user.dto';

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  async getById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async getAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async create(user: UserDto) {
    const newUser = this.userRepository.create(user);

    const createdUser = await this.userRepository.save(newUser);

    return createdUser;
  }
}

export default new UserService();
