import UserMapper from '../../core/mappers/user.mapper';
import UserModel from '../../core/models/user.model';
import { User } from '../entities/user.entity';

class PgUserMapper extends UserMapper {
  public static mapToUserModel(user: User): UserModel {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname,
      nickname: user.nickname,
      isVerified: user.isVerified,
      role: user.role,
    };
  }
}

export default PgUserMapper;
