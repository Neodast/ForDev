import { User } from '@/shared/models/entities/user.entity';

export type UserStoreState = {
  user: User | null;
  isLoading: boolean;
  isAuth: boolean;
};
