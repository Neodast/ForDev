import RegistrationFormState from './RegistrationFormState';

type RegistrationFormAction = {
  updateName: (name: RegistrationFormState['name']) => void;
  updateSurname: (surname: RegistrationFormState['surname']) => void;
  updateEmail: (email: RegistrationFormState['email']) => void;
  updateFirstPassword: (
    firstPassword: RegistrationFormState['firstPassword']
  ) => void;
  updateSecondPassword: (
    secondPassword: RegistrationFormState['secondPassword']
  ) => void;
};

export default RegistrationFormAction;
