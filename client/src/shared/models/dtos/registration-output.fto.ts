import { User } from '../entities/user.entity';

export type RegistrationOutputDto = {
  accessToken: string;
  user: User;
};
