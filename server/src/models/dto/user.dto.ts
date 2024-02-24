import Role from '../../utils/enums/roles.enum';

export default interface UserDto {
  id: string;
  email: string;
  name: string;
  surname: string;
  role: Role;
  isVerified: boolean;
}
