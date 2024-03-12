import Role from '../../utils/enums/roles.enum';

interface UserModel {
  id: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  role: Role;
  isVerified: boolean;
}

export default UserModel;
