import Role from '../../utils/enums/roles.enum';

type UserModel = {
  id: string;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  password: string;
  role: Role;
  isVerified: boolean;
};

export default UserModel;
