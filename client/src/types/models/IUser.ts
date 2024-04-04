import Role from '../user/roles.enum';

interface IUser {
  id: string;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  role: Role;
}

export default IUser;
