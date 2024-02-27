import { Repository } from 'typeorm';
import ITokenRepository from '../ITokenRepository';
import { Token } from '../../models/tokenEntity';
import appDataSource from '../../appDataSourse';
import TokenModelDto from '../../models/dto/TokenDtos/tokenModel.dto';

class TokenPgRepository implements ITokenRepository {
  private readonly tokenRepository: Repository<Token>;

  constructor() {
    this.tokenRepository = appDataSource.getRepository(Token);
  }

  async createRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<TokenModelDto> {
    const token = await this.tokenRepository.findOneBy({
      user: { id: userId },
    });

    if (token) {
      await this.updateRefreshToken(token, refreshToken);
    }

    const newToken = this.tokenRepository.create({
      user: { id: userId },
      refreshToken,
    });

    return await this.tokenRepository.save(newToken);
  }
  async updateRefreshToken(
    refreshToken: TokenModelDto,
    newRefresh: string
  ): Promise<TokenModelDto> {
    refreshToken.refreshToken = newRefresh;
    return await this.tokenRepository.save(refreshToken);
  }

  async deleteRefreshToken(tokenId: number): Promise<void> {
    await this.tokenRepository.delete(tokenId);
  }

  async getByUserId(userId: string): Promise<TokenModelDto> {
    const token = await this.tokenRepository.findOneBy({
      user: { id: userId },
    });

    if (!token) {
      throw new Error('Token is not found');
    }
    return token;
  }

  async getByRefreshToken(refreshToken: string): Promise<TokenModelDto> {
    const token = await this.tokenRepository.findOneBy({ refreshToken });
    if (!token) {
      throw new Error('Token is not found');
    }
    return token;
  }
}

export default new TokenPgRepository();
