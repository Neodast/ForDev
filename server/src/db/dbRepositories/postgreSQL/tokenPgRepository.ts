import { Repository } from 'typeorm';
import ITokenRepository from '../../../core/repositories/ITokenRepository';
import { Token } from '../../entities/tokenEntity';
import appDataSource from '../../appDataSourse';
import TokenModel from '../../../core/models/tokenModel';
import PgTokenMapper from '../../dbMappers/pgMappers/dbTokenMappers';

class TokenPgRepository implements ITokenRepository {
  private readonly tokenRepository: Repository<Token>;

  constructor() {
    this.tokenRepository = appDataSource.getRepository(Token);
  }

  async createRefreshToken(
    userId: string,
    refreshToken: string
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
      await this.tokenRepository.save(newToken)
    );
  }
  async updateRefreshToken(
    refreshToken: TokenModel,
    newRefresh: string
  ): Promise<TokenModel> {
    refreshToken.refreshToken = newRefresh;
    return PgTokenMapper.mapToTokenModel(
      await this.tokenRepository.save(refreshToken)
    );
  }

  async deleteRefreshToken(tokenId: number): Promise<void> {
    await this.tokenRepository.delete(tokenId);
  }

  async getByUserId(userId: string): Promise<TokenModel> {
    const token = await this.tokenRepository.findOneBy({
      user: { id: userId },
    });

    if (!token) {
      throw new Error('Token is not found');
    }
    return PgTokenMapper.mapToTokenModel(token);
  }

  async getByRefreshToken(refreshToken: string): Promise<TokenModel> {
    const token = await this.tokenRepository.findOneBy({ refreshToken });
    if (!token) {
      throw new Error('Token is not found');
    }
    return  PgTokenMapper.mapToTokenModel(token);
  }
}

export default new TokenPgRepository();
