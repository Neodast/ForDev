interface IRegisterInput {
  name?: string;
  surname?: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default IRegisterInput;