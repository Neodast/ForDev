import UserModelDto from '../../core/models/userModel';
import UserCreateDto from '../../utils/dtos/userDtos/userCreate.dto';
import { User } from '../entities/userEntity';

class UserMapper {
  public static mapToUserModel(user: User): UserModelDto {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname,
      isVerified: user.isVerified,
      role: user.role,
    };
  }
}

export default UserMapper;
