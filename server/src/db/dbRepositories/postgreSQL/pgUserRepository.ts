import { Repository } from 'typeorm';
import { User } from '../../entities/userEntity';
import appDataSource from '../../appDataSourse';
import UserSafeDto from '../../../utils/dtos/userDtos/userSafe.dto';
import IUserRepository from '../../../core/repositories/IUserRepository';
import UserCreateDto from '../../../utils/dtos/userDtos/userCreate.dto';
import UserModel from '../../../core/models/userModel';
import PgUserMapper from '../../dbMappers/postgreSQL/pgUserMappers';

class PgUserRepository implements IUserRepository {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  private async findUser(
    criteria: Record<string, unknown>,
  ): Promise<UserModel> {
    const dbUser = await this.userRepository.findOneBy(criteria);
    if (!dbUser) {
      throw new Error('User is not found');
    }
    const user: UserModel = PgUserMapper.mapToUserModel(dbUser);
    return user;
  }

  public async getById(id: string): Promise<UserModel> {
    return this.findUser({ id });
  }

  public async getByEmail(email: string): Promise<UserModel> {
    return this.findUser({ email });
  }

  public async getAll(): Promise<UserCreateDto[]> {
    const dbUsers = await this.userRepository.find();
    if (!dbUsers.length) {
      throw new Error('Users are not found');
    }
    const users = dbUsers.map((dbUser) =>
      PgUserMapper.mapToUserCreateDto(dbUser),
    );
    return users;
  }

  public async createUser(newuser: UserCreateDto): Promise<UserSafeDto> {
    const user = await this.userRepository.findOneBy({
      email: newuser.email,
    });
    if (user) {
      throw new Error('User alredy exists');
    }
    const newUser = this.userRepository.create(newuser);
    return PgUserMapper.mapToUserSafeDto(
      await this.userRepository.save(newUser),
    );
  }

  public async deleteUser(user: UserCreateDto): Promise<void> {
    const dbUser = await this.getByEmail(user.email);
    await this.userRepository.delete(dbUser);
  }

  public async updateUser(id: string, newUserData: UserModel): Promise<UserSafeDto> {
    const user = await this.getById(id);
    Object.assign(user, newUserData);
    return PgUserMapper.mapToUserModel(await this.userRepository.save(user));
  }
}

export default new PgUserRepository();
