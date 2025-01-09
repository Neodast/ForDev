import { User } from '@/shared/models/entities/user.entity';
import { LoginOutputDto } from '@shared/models/dtos/login-output.dto';

export type UserStoreAction = {
  setUser: (user: User | null) => void;
  getUser: () => User;
  setIsLoading: (isLoading: boolean) => void;
  setIsAuth: (isAuth: boolean) => void;
  login: (credentials: LoginOutputDto) => void;
  logout: () => void;
};
