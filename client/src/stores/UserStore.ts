import { create } from 'zustand';
import User from '../types/models/User';
import LoginOutput from '../types/user/LoginOutput';
import UserStore from '../types/user/userStore/UserStore';

export const useUserStore = create<UserStore>((set) => ({
  isLoading: false,
  isAuth: false,
  user: null,
  setUser: (user: User | null) => {
    set(() => ({
      user: user,
    }));
  },
  setIsLoading: (isLoading: boolean) => {
    set(() => ({ isLoading }));
  },
  setIsAuth: (isAuth: boolean) => {
    set(() => ({ isAuth }));
  },
  login: (credentials: LoginOutput) => {
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
