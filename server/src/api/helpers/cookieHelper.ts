import { Response } from 'express';

class CookieHelper {
  public static async saveRefreshTokenCookie(
    res: Response,
    refreshToken: string
  ): Promise<void> {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    });
  }

  public static async removeRefreshTokenCookie(res: Response): Promise<void> {
    res.clearCookie('refreshToken');
  }
}

export default CookieHelper;