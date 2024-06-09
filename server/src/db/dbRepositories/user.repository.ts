import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { pgDataSource } from '../db.config';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import UserRepository from '../../core/repositories/user.repository.type';
import UserCreateDto from '../../utils/dtos/users/user-create.dto';
import UserModel from '../../core/models/user.model';
import PgUserMapper from '../dbMappers/user.db-mapper';
import { injectable } from 'inversify';

@injectable()
class PgUserRepository implements UserRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = pgDataSource.getRepository(User);
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

  public async getById(userId: string): Promise<UserModel> {
    return PgUserMapper.mapToUserModel(await this.findUser({ id: userId }));
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
    userId: string,
    newUserData: UserModel,
  ): Promise<UserSafeDto> {
    const dbUser = await this.getById(userId);
    Object.assign(dbUser, newUserData);
    return PgUserMapper.mapToUserModel(await this.userRepository.save(dbUser));
  }
}

export default PgUserRepository;
