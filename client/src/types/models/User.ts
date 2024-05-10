import Role from '../user/roles.enum';

type User = {
  id: string;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  isVerify: boolean;
  role: Role;
};

export default User;
