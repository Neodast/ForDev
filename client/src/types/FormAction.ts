import FormState from './FormState';

type FormAction = {
  updateName: (name: FormState['name']) => void;
  updateSurname: (surname: FormState['surname']) => void;
  updateEmail: (email: FormState['email']) => void;
  updateFirstPassword: (firstPassword: FormState['firstPassword']) => void;
  updateSecondPassword: (secondPassword: FormState['secondPassword']) => void;
};

export default FormAction;