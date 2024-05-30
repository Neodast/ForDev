import { Container } from 'inversify';
import { UserTypes } from '../types/user.types';
import UserService from '../services/user.service';
import UserController from '../../api/controllers/user.controller';
import PgUserRepository from '../../db/dbRepositories/user.repository';
import UserRepository from '../repositories/user.repository.type';
import TokenService from '../services/token.service';
import { TokenTypes } from '../types/token.types';
import TokenRepository from '../repositories/token.repository.type';
import PgTokenRepository from '../../db/dbRepositories/token.repository';
import EmailService from '../services/email.service';
import { EmailTypes } from '../types/email.types';

const userContainer = new Container({ defaultScope: 'Singleton' });
userContainer.bind<UserService>(UserTypes.UserService).to(UserService);
userContainer
  .bind<UserRepository>(UserTypes.UserRepository)
  .to(PgUserRepository);
userContainer.bind<UserController>(UserTypes.UserController).to(UserController);
userContainer.bind<TokenService>(TokenTypes.TokenService).to(TokenService);
userContainer
  .bind<TokenRepository>(TokenTypes.TokenRepository)
  .to(PgTokenRepository);
userContainer.bind<EmailService>(EmailTypes.EmailService).to(EmailService);
export { userContainer };
