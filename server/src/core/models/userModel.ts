import Role from '../../utils/enums/roles.enum';

interface UserModelDto {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  role: Role;
  isVerified: boolean;
}

export default UserModelDto;