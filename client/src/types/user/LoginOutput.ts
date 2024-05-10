import Token from '../models/Token';
import User from '../models/User';

type LoginOutput = {
  tokens: Token;
  user: User;
};

export default LoginOutput;
