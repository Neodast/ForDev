import UserMapper from '../../../core/mappers/UserMappers';
import UserModel from '../../../core/models/UserModel';
import { User } from '../../entities/UserEntity';

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
