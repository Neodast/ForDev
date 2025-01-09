import { create } from 'zustand';
import { User } from '@/shared/models/entities/user.entity';
import { UserStoreAction } from '@/shared/models/stores/user/user-actions.type';
import { UserStoreState } from '@/shared/models/stores/user/user-state.type';
import { LoginOutputDto } from '@shared/models/dtos/login-output.dto';

export const useUserStore = create<UserStoreState & UserStoreAction>((set) => ({
  isLoading: false,
  isAuth: false,
  user: null,
  setUser: (user: User | null) => {
    set(() => ({
      user: user,
    }));
  },
  getUser() {
    if (!this.user) {
      throw new Error('User is not found');
    }
    return this.user;
  },
  setIsLoading: (isLoading: boolean) => {
    set(() => ({ isLoading }));
  },
  setIsAuth: (isAuth: boolean) => {
    set(() => ({ isAuth }));
  },
  login: (credentials: LoginOutputDto) => {
    try {
      const { user, tokens } = credentials;
      set(() => ({
        isLoading: true,
        isAuth: true,
        user: {
          ...user,
        },
      }));
      localStorage.setItem('accessToken', tokens.accessToken);
    } catch (e) {
      set(() => ({
        user: null,
        isAuth: false,
      }));
      localStorage.removeItem('accessToken');
      console.log(e);
    } finally {
      set(() => ({
        isLoading: false,
      }));
    }
  },
  logout: () => {
    set(() => ({
      user: null,
      isAuth: false,
    }));
    localStorage.removeItem('accessToken');
  },
}));
