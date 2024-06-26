import jwt from 'jsonwebtoken';
import TokenPayloadDto from '../../utils/dtos/tokens/token-payload.dto';
import ApiError from '../../utils/exceptions/api-error';
import TokenRepository from '../repositories/token.repository.type';
import TokensOutputDto from '../../utils/dtos/tokens/token-output.dto';
import UserModel from '../models/user.model';
import { inject, injectable } from 'inversify';
import { TokenTypes } from '../../utils/types/containers/token.types';
import TokenModel from '../models/token.model';
import { env } from '../../utils/env.scheme';

@injectable()
export class TokenService {
  constructor(
    @inject(TokenTypes.TokenRepository)
    private tokenRepository: TokenRepository,
  ) {}
  //TODO create helpers for generate JWT
  async generateTokens(payload: TokenPayloadDto): Promise<TokensOutputDto> {
    const accessToken = jwt.sign(
      payload,
      env.JWT_ACCESS_SECRET,
      {
        expiresIn: '30m',
      },
    );
    const refreshToken = jwt.sign(
      payload,
      env.JWT_REFRESH_SECRET,
      {
        expiresIn: '30d',
      },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string): Promise<void> {
    await this.tokenRepository.createRefreshToken(userId, refreshToken);
  }

  async createTokens(userData: UserModel): Promise<TokensOutputDto> {
    const tokenPayload: TokenPayloadDto = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    };

    const tokens = await this.generateTokens(tokenPayload);

    await this.saveToken(userData.id, tokens.refreshToken);

    return tokens;
  }

  async getByRefreshToken(refreshToken: string): Promise<TokenModel> {
    return await this.tokenRepository.getByRefreshToken(refreshToken);
  }

  async deleteToken(refreshToken: string): Promise<void> {
    const token = await this.tokenRepository.getByRefreshToken(refreshToken);

    await this.tokenRepository.deleteRefreshToken(token.refreshToken);
  }

  validateRefreshToken(refreshToken: string): TokenPayloadDto {
    try {
      const jwtRefreshSecret = env.JWT_REFRESH_SECRET;

      const userData = jwt.verify(refreshToken, jwtRefreshSecret);

      return userData as TokenPayloadDto;
    } catch (error) {
      throw ApiError.BadRequest('Refresh-token is not valid');
    }
  }

  async validateAccessToken(accessToken: string): Promise<TokenPayloadDto> {
    try {
      const jwtAccessSecret = env.JWT_ACCESS_SECRET;

      const userData = jwt.verify(accessToken, jwtAccessSecret);

      return userData as TokenPayloadDto;
    } catch (error) {
      throw ApiError.UnauthorizedError();
    }
  }
}