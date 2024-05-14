import Role from '../../enums/roles.enum';

type UserSafeDto = {
  id: string;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  role: Role;
  isVerified: boolean;
}

export default UserSafeDto;
