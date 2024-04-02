import { create } from 'zustand';
import LoginFormAction from '../types/user/LoginFormAction';
import LoginFormState from '../types/user/LoginFormState';
import AuthService from '../services/authService';
import UserService from '../services/userService';

export const useLoginFormStore = create<LoginFormState & LoginFormAction>(
  (set) => ({
    email: '',
    password: '',
    updateEmail: (email) => set(() => ({ email: email })),
    updatePassword: (password) => set(() => ({ password: password })),
  }),
);

export const login = async (email: string, password: string) => {
  try {
    const res = await AuthService.login(email, password);
    localStorage.setItem('token', res.data.accessToken);
  } catch (e) {
    console.log(e);
  }
};

export const getAllUser = async () => {
  try {
    const res = await UserService.getAllUsers();
    return res;
  } catch (e) {
    console.log(e);
  }
};
