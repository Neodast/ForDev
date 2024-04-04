import { create } from 'zustand';
import IUser from '../types/models/IUser';
import ILoginOutput from '../types/user/ILoginOutput';
import IUserStore from '../types/user/userStore/IUserStore';

export const useUserStore = create<IUserStore>((set) => ({
  isLoading: false,
  isAuth: false,
  user: null,
  setUser: (user: IUser | null) => {
    set(() => ({ user }));
  },
  setIsLoading: (isLoading: boolean) => {
    set(() => ({ isLoading }));
  },
  setIsAuth: (isAuth: boolean) => {
    set(() => ({ isAuth }));
  },
  setCredentials: (credentials: ILoginOutput) => {
    set(() => ({
      user: {
        id: credentials.id,
        name: credentials.name,
        surname: credentials.surname,
        email: credentials.email,
        nickname: credentials.nickname,
        role: credentials.role,
      },
      isAuth: true,
    }));
    localStorage.setItem('accessToken', credentials.accessToken);
  },
  removeCredentials: () => {
    set(() => ({
      user: null,
      isAuthenticated: false,
    }));
    localStorage.removeItem('accessToken');
  },
}));
