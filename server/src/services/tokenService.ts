import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { Token } from '../models/tokenEntity';
import appDataSource from '../appDataSourse';
import { Response } from 'express';
import TokenPayloadDto from '../models/dto/tokenPayload.dto';
import ApiError from '../utils/exeptions/apiError';
import ITokenRepository from '../repositories/ITokenRepository';
import tokenPgRepository from '../repositories/PostgreSQL/tokenPgRepository';

class TokenService {
  private readonly tokenRepository: ITokenRepository = tokenPgRepository;

  async generateTokens(payload: TokenPayloadDto) {
    const accessToken = jwt.sign(
      payload,
      String(process.env.JWT_ACCESS_SECRET),
      {
        expiresIn: '30m',
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

  async saveToken(userId: string, refreshToken: string) {
    await this.tokenRepository.createRefreshToken(userId, refreshToken);
  }

  async saveRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });
  }

  async removeRefreshTokenCookie(res: Response) {
    res.clearCookie('refreshToken');
  }

  async deleteToken(userId: string) {
    const token = await this.tokenRepository.getByUserId(userId);

    await this.tokenRepository.deleteRefreshToken(token.id);
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const jwtRefreshSecret = String(process.env.JWT_REFRESH_SECRET);

      const userData = jwt.verify(refreshToken, jwtRefreshSecret);

      return userData as TokenPayloadDto;
    } catch (error) {
      throw ApiError.BadRequest('Refresh-token is not valid');
    }
  }

  validateAccessToken(accessToken: string) {
    try {
      const jwtAccessSecret = String(process.env.JWT_ACCESS_SECRET);

      const userData = jwt.verify(accessToken, jwtAccessSecret);

      return userData as TokenPayloadDto;
    } catch (error) {
      throw ApiError.BadRequest('Access-token is not valid');
    }
  }
}

export default new TokenService();
