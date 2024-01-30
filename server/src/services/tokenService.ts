import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { Token } from '../models/tokenEntity';
import appDataSource from '../appDataSourse';
import { Response } from 'express';
import TokenPayloadDto from '../models/dto/tokenPayload.dto';

class TokenService {
  private tokenRepository: Repository<Token>;

  constructor() {
    this.tokenRepository = appDataSource.getRepository(Token);
  }

  async generateTokens(payload: any) {
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
    const token = await this.tokenRepository.findOneBy({
      user: { id: userId },
    });

    if (token) {
      token.refreshToken = refreshToken;

      const updatedToken = await this.tokenRepository.save(token);

      return updatedToken;
    }

    const createdToken = this.tokenRepository.create({
      user: { id: userId },
      refreshToken,
    });

    const newToken = await this.tokenRepository.save(createdToken);

    return newToken;
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

  async deleteToken(refreshToken: string) {
    const token = await this.tokenRepository.findOneBy({ refreshToken });

    if (!token) {
      throw new Error('Token is undefined!');
    }

    await this.tokenRepository.delete(token.id);
  }

  validateRefreshToken(refreshToken: string) {
		try {
			const jwtRefreshSecret = String(process.env.JWT_REFRESH_SECRET)

			const userData = jwt.verify(refreshToken, jwtRefreshSecret)

			return userData as TokenPayloadDto
		} catch (error) {
			throw new Error('Refresh validate')
		}
	}

  validateAccessToken(accessToken: string) {
		try {
			const jwtAccessSecret = String(process.env.JWT_ACCESS_SECRET)

			const userData = jwt.verify(accessToken, jwtAccessSecret)

			return userData as TokenPayloadDto
		} catch (error) {
			throw new Error('Access validate')
		}
	}

  async getByRefreshToken(refreshToken: string) {
		const token = await this.tokenRepository.findOneBy({
			refreshToken,
		})

		return token
	}
}

export default new TokenService();
