import Role from '../../enums/roles.enum';

interface UserSafeDto {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: Role;
  isVerified: boolean;
}

export default UserSafeDto;
