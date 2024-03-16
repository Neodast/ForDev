import { Repository } from 'typeorm';
import { User } from '../../entities/userEntity';
import appDataSource from '../../appDataSourse';
import UserSafeDto from '../../../utils/dtos/userDtos/user.dto';
import IUserRepository from '../../../core/repositories/IUserRepository';
import UserCreateDto from '../../../utils/dtos/userDtos/userCreate.dto';
import UserModel from '../../../core/models/userModel';
import PgUserMapper from '../../dbMappers/pgMappers/dbUserMappers';

class UserPgRepository implements IUserRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  private async findUser(criteria: Record<string, unknown>): Promise<UserModel> {
    const dbUser = await this.userRepository.findOneBy(criteria);
    if (!dbUser) {
      throw new Error('User is not found');
    }
    const user: UserModel = PgUserMapper.mapToUserModel(dbUser);
    return user;
  }

  async getById(id: string): Promise<UserModel> {
    return this.findUser({ id });
  }

  async getByEmail(email: string): Promise<UserModel> {
    return this.findUser({ email });
  }

  async getAll(): Promise<Array<UserCreateDto>> {
    const dbUsers = await this.userRepository.find();
    if (!dbUsers.length) {
      throw new Error('Users is not found');
    }
    const users = dbUsers.map((dbUser) => PgUserMapper.mapToUserCreateDto(dbUser));
    return users;
  }

  async createUser(candidate: UserCreateDto): Promise<UserSafeDto> {
    const user = await this.userRepository.findOneBy({
      email: candidate.email,
    });
    if (user) {
      throw new Error('User alredy exists');
    }
    const newUser = this.userRepository.create(candidate);
    return PgUserMapper.mapToUserSafeDto(await this.userRepository.save(newUser));
  }

  async deleteUser(candidate: UserCreateDto): Promise<void> {
    const user = await this.getByEmail(candidate.email);
    await this.userRepository.delete(user);
  }

  async updateUser(id: string, newData: UserModel): Promise<UserSafeDto> {
    const user = await this.getById(id);
    Object.assign(user, newData);
    return PgUserMapper.mapToUserModel(await this.userRepository.save(user));
  }
}

export default new UserPgRepository();
