import { create } from 'zustand';
import RegistrationFormState from '../types/user/RegistrationFormState';
import RegistrationFormAction from '../types/user/RegistrationFormAction';

export const useRegistrationFormStore = create<
  RegistrationFormState & RegistrationFormAction
>((set) => ({
  name: '',
  surname: '',
  email: '',
  nickname: '',
  firstPassword: '',
  secondPassword: '',
  updateName: (name) => set(() => ({ name: name })),
  updateSurname: (surname) => set(() => ({ surname: surname })),
  updateEmail: (email) => set(() => ({ email: email })),
  updateNickname: (nickname) => set(() => ({ nickname: nickname })),
  updateFirstPassword: (firstPassword) =>
    set(() => ({ firstPassword: firstPassword })),
  updateSecondPassword: (secondPassword) =>
    set(() => ({ secondPassword: secondPassword })),
}));
