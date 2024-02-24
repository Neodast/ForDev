import { Repository } from 'typeorm';
import { User } from '../../models/userEntity';
import appDataSource from '../../appDataSourse';
import UserDto from '../../models/dto/user.dto';
import IUserRepository from '../IUserRepository';
import UserCreateDto from '../../models/dto/userCreate.dto';

class UserPgRepository implements IUserRepository {
  readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  async findUser(criteria: Record<string, any>): Promise<UserDto> {
    const user = await this.userRepository.findOneBy(criteria);
    if (!user) {
      throw new Error('User is not found');
    }
    return user;
  }

  async getById(id: string): Promise<UserDto> {
    return this.findUser({ id });
  }

  async getByEmail(email: string): Promise<UserDto> {
    return this.findUser({ email });
  }

  async getAll(): Promise<Array<UserDto>> {
    const users = await this.userRepository.find();
    if (!users.length) {
      throw new Error('Users is not found');
    }
    return users;
  }

  async createUser(candidate: UserCreateDto): Promise<UserDto> {
    const user = await this.getByEmail(candidate.email);

    if (user) {
      throw new Error('User alredy exists');
    }

    const newUser = this.userRepository.create(candidate);

    const createdUser = await this.userRepository.save(newUser);

    return createdUser;
  }

  async deleteUser(candidate: UserCreateDto): Promise<void> {
    const user = await this.getByEmail(candidate.email);

    await this.userRepository.delete(user);
  }

  updateUser(): Promise<UserDto> {
    // implementation
  }

  verify(): Promise<void> {
    // implementation
  }
}
