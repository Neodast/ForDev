import { Token } from '../entities/token.entity';
import { User } from '../entities/user.entity';

export type LoginOutputDto = {
  tokens: Token;
  user: User;
};
