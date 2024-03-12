import UserSafeDto from '../../utils/dtos/userDtos/user.dto';
import UserCreateDto from '../../utils/dtos/userDtos/userCreate.dto';
import UserModel from '../models/userModel';

class UserMapper {
  public static mapToUserCreateDto(user: UserModel): UserCreateDto {
    return {
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname
    }
  }

  public static mapToUserSafeDto(user: UserModel): UserSafeDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      isVerified: user.isVerified,
      role: user.role,
    };
  }
}

export default UserMapper;