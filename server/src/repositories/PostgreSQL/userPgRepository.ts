import { Repository } from 'typeorm';
import { User } from '../../models/userEntity';
import appDataSource from '../../appDataSourse';
import UserDto from '../../models/dto/user.dto';
import IUserRepository from '../IUserRepository';
import UserCreateDto from '../../models/dto/userCreate.dto';
import UserModelDto from '../../models/dto/userModel.dto';

class UserPgRepository implements IUserRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  private async findUser(criteria: Record<string, any>): Promise<UserModelDto> {
    const user = await this.userRepository.findOneBy(criteria);
    if (!user) {
      throw new Error('User is not found');
    }
    return user;
  }

  async getById(id: string): Promise<UserModelDto> {
    return this.findUser({ id });
  }

  async getByEmail(email: string): Promise<UserModelDto> {
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
    const user = await this.userRepository.findOneBy({
      email: candidate.email,
    });
    if (user) {
      throw new Error('User alredy exists');
    }

    const newUser = this.userRepository.create(candidate);
    return await this.userRepository.save(newUser);
  }

  async deleteUser(candidate: UserCreateDto): Promise<void> {
    const user = await this.getByEmail(candidate.email);
    await this.userRepository.delete(user);
  }

  async updateUser(user: UserDto, newUser: UserCreateDto): Promise<UserDto> {
    await this.getByEmail(user.email);
    return await this.userRepository.save({ ...user, ...newUser });
  }

  async verify(id: string): Promise<UserDto> {
    const user = await this.getById(id);

    user.isVerified = true;

    return await this.userRepository.save(user);
  }
}

export default new UserPgRepository();
