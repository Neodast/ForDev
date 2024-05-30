import { Repository } from 'typeorm';
import TokenRepository from '../../core/repositories/token.repository.type';
import { Token } from '../entities/token.entity';
import { pgDataSource } from '../appDataSourse';
import TokenModel from '../../core/models/token.model';
import PgTokenMapper from '../dbMappers/token.db-mapper';
import { injectable } from 'inversify';

@injectable()
class PgTokenRepository implements TokenRepository {
  private readonly tokenRepository: Repository<Token>;

  constructor() {
    this.tokenRepository = pgDataSource.getRepository(Token);
  }

  async createRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<TokenModel> {
    const token = await this.tokenRepository.findOneBy({
      user: { id: userId },
    });

    if (token) {
      return await this.updateRefreshToken(token, refreshToken);
    }

    const newToken = this.tokenRepository.create({
      user: { id: userId },
      refreshToken,
    });

    return PgTokenMapper.mapToTokenModel(
      await this.tokenRepository.save(newToken),
    );
  }
  async updateRefreshToken(
    refreshToken: TokenModel,
    newRefresh: string,
  ): Promise<TokenModel> {
    refreshToken.refreshToken = newRefresh;
    return PgTokenMapper.mapToTokenModel(
      await this.tokenRepository.save(refreshToken),
    );
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    const token = await this.tokenRepository.findOneBy({
      refreshToken: refreshToken,
    });
    if (!token) {
      throw new Error('Token is not found!');
    }
    await this.tokenRepository.remove(token);
  }

  async getByUserId(userId: string): Promise<TokenModel> {
    const token = await this.tokenRepository.findOneBy({
      user: { id: userId },
    });

    if (!token) {
      console.log(token);
      throw new Error('Token is not found');
    }
    return PgTokenMapper.mapToTokenModel(token);
  }

  async getByRefreshToken(refreshToken: string): Promise<TokenModel> {
    const token = await this.tokenRepository.findOneBy({
      refreshToken: refreshToken,
    });
    if (!token) {
      throw new Error('Token is not found');
    }
    return PgTokenMapper.mapToTokenModel(token);
  }
}

export default PgTokenRepository;
