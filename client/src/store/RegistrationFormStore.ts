import { create } from 'zustand';
import RegistrationFormState from '../types/RegistrationFormState';
import RegistrationFormAction from '../types/RegistrationFormAction';

export const useRegistrationFormStore = create<
  RegistrationFormState & RegistrationFormAction
>((set) => ({
  name: '',
  surname: '',
  email: '',
  firstPassword: '',
  secondPassword: '',
  updateName: (name) => set(() => ({ name: name })),
  updateSurname: (surname) => set(() => ({ surname: surname })),
  updateEmail: (email) => set(() => ({ email: email })),
  updateFirstPassword: (firstPassword) =>
    set(() => ({ firstPassword: firstPassword })),
  updateSecondPassword: (secondPassword) =>
    set(() => ({ secondPassword: secondPassword })),
}));
