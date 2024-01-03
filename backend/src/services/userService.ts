import { Repository } from 'typeorm';
import appDataSource from '../appDataSourse';
import { User } from '../models/userEntity';
import UserCreateDto from '../dto/userCreate.dto';
import UserLoginDto from '../dto/userLogin.dto';
import TokenPayloadDto from '../dto/tokenPayload.dto';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import emailService from './emailService';
import tokenService from './tokenService';

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  async getById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
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
}

export default new UserService();
