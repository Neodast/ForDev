import Role from '../../utils/enums/roles.enum';

export default interface UserModelDto {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  role: Role;
  isVerified: boolean;
}