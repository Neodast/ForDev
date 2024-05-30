import { Container } from 'inversify';
import { TokenTypes } from '../types/token.types';
import TokenService from '../services/token.service';
import PgTokenRepository from '../../db/dbRepositories/token.repository';
import TokenRepository from '../repositories/token.repository.type';

const tokenContainer = new Container({ defaultScope: "Singleton" });
tokenContainer.bind<TokenService>(TokenTypes.TokenService).to(TokenService);
tokenContainer.bind<TokenRepository>(TokenTypes.TokenRepository).to(PgTokenRepository);

export { tokenContainer };
