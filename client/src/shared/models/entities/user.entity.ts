import Role from '../enums/roles.enum';

export type User = {
  id: string;
  email: string;
  name: string;
  surname: string;
  nickname: string;
  isVerify: boolean;
  role: Role;
};
