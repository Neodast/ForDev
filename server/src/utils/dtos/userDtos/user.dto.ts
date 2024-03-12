import Role from '../../enums/roles.enum';

export default interface UserSafeDto {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: Role;
  isVerified: boolean;
}
