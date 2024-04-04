import Role from '../../enums/roles.enum';

interface UserSafeDto {
  id: string;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  role: Role;
  isVerified: boolean;
}

export default UserSafeDto;
