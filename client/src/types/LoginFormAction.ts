import LoginFormState from './LoginFormState';

type LoginFormAction = {
  updateEmail : (email: LoginFormState['email']) => void;
  updatePassword: (password: LoginFormState['password']) => void;
}

export default LoginFormAction;