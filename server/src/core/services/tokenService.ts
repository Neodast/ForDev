import jwt from 'jsonwebtoken';
import { Response } from 'express';
import TokenPayloadDto from '../../utils/dtos/tokenDtos/tokenPayload.dto';
import ApiError from '../../utils/exeptions/apiError';
import ITokenRepository from '../repositories/ITokenRepository';
import tokenPgRepository from '../../db/dbRepositories/postgreSQL/tokenPgRepository';
import TokensOutputDto from '../../utils/dtos/tokenDtos/tokensOutput.dto';
import UserModel from '../models/userModel';

class TokenService {
  constructor(readonly tokenRepository: ITokenRepository) {}

  async generateTokens(payload: TokenPayloadDto): Promise<TokensOutputDto> {
    const accessToken = jwt.sign(
      payload,
      String(process.env.JWT_ACCESS_SECRET),
      {
        expiresIn: '30s',
      }
    );
    const refreshToken = jwt.sign(
      payload,
      String(process.env.JWT_REFRESH_SECRET),
      {
        expiresIn: '30d',
      }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string): Promise<void> {
    await this.tokenRepository.createRefreshToken(userId, refreshToken);
  }

  async saveRefreshTokenCookie(
    res: Response,
    refreshToken: string
  ): Promise<void> {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });
  }

  async removeRefreshTokenCookie(res: Response): Promise<void> {
    res.clearCookie('refreshToken');
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

  async deleteToken(userId: string): Promise<void> {
    const token = await this.tokenRepository.getByUserId(userId);

    await this.tokenRepository.deleteRefreshToken(token.id);
  }

  validateRefreshToken(refreshToken: string): TokenPayloadDto {
    try {
      const jwtRefreshSecret = String(process.env.JWT_REFRESH_SECRET);

      const userData = jwt.verify(refreshToken, jwtRefreshSecret);

      return userData as TokenPayloadDto;
    } catch (error) {
      throw ApiError.BadRequest('Refresh-token is not valid');
    }
  }

  validateAccessToken(accessToken: string): TokenPayloadDto {
    try {
      const jwtAccessSecret = String(process.env.JWT_ACCESS_SECRET);

      const userData = jwt.verify(accessToken, jwtAccessSecret);

      return userData as TokenPayloadDto;
    } catch (error) {
      throw ApiError.UnauthorizedError();
    }
  }
}

export default new TokenService(tokenPgRepository);
