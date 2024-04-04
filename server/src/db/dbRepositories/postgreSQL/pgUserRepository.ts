import { Repository } from 'typeorm';
import { User } from '../../entities/userEntity';
import appDataSource from '../../appDataSourse';
import UserSafeDto from '../../../utils/dtos/users/userSafe.dto';
import IUserRepository from '../../../core/repositories/IUserRepository';
import UserCreateDto from '../../../utils/dtos/users/userCreate.dto';
import UserModel from '../../../core/models/userModel';
import PgUserMapper from '../../dbMappers/postgreSQL/pgUserMappers';

class PgUserRepository implements IUserRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  private async findUser(criteria: Record<string, unknown>): Promise<User> {
    const dbUser = await this.userRepository.findOneBy(criteria);
    if (!dbUser) {
      throw new Error('User is not found');
    }
    return dbUser;
  }

  private async findUsers(criteria?: Record<string, unknown>): Promise<User[]> {
    const dbUsers = await this.userRepository.find(criteria);
    if (!dbUsers.length) {
      throw new Error('Users are not found');
    }
    return dbUsers;
  }

  public async getById(id: string): Promise<UserModel> {
    return PgUserMapper.mapToUserModel(await this.findUser({ id }));
  }

  public async getByEmail(email: string): Promise<UserModel> {
    return PgUserMapper.mapToUserModel(await this.findUser({ email }));
  }

  public async getAll(): Promise<UserCreateDto[]> {
    const dbUsers = await this.findUsers();
    const users = dbUsers.map((dbUser) =>
      PgUserMapper.mapToUserCreateDto(dbUser),
    );
    return users;
  }

  public async createUser(newUser: UserCreateDto): Promise<UserSafeDto> {
    const dbUser = await this.userRepository.findOneBy({
      email: newUser.email,
    });
    if (dbUser) {
      throw new Error('User alredy exists');
    }
    const user = this.userRepository.create(newUser);
    return PgUserMapper.mapToUserSafeDto(await this.userRepository.save(user));
  }

  public async deleteUser(user: UserCreateDto): Promise<void> {
    const dbUser = await this.findUser({ user });
    await this.userRepository.remove(dbUser);
  }

  public async updateUser(
    id: string,
    newUserData: UserModel,
  ): Promise<UserSafeDto> {
    const dbUser = await this.getById(id);
    Object.assign(dbUser, newUserData);
    return PgUserMapper.mapToUserModel(await this.userRepository.save(dbUser));
  }
}

export default new PgUserRepository();
