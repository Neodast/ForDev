import { create } from 'zustand';
import FormState from '../types/FormState';
import FormAction from '../types/FormAction';

export const useFormStore = create<FormState & FormAction>((set) => ({
  name: '',
  surname: '',
  email: '',
  firstPassword: '',
  secondPassword: '',
  updateName: (name) => set(() => ({ name: name })),
  updateSurname: (surname) => set(() => ({ surname: surname })),
  updateEmail: (email) => set(() => ({ email: email })),
  updateFirstPassword: (firstPassword) => set(() => ({ firstPassword: firstPassword })),
  updateSecondPassword: (secondPassword) => set(() => ({ secondPassword: secondPassword })),
}));