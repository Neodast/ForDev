import { create } from 'zustand';
import LoginFormAction from '../types/LoginFormAction';
import LoginFormState from '../types/LoginFormState';

export const useLoginFormStore = create<LoginFormState & LoginFormAction>(
  (set) => ({
    email: '',
    password: '',
    updateEmail: (email) => set(() => ({ email: email })),
    updatePassword: (password) => set(() => ({ password: password })),
  })
);
