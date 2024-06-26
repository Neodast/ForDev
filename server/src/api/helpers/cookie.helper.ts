import { Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export class CookieHelper {
  public async saveRefreshTokenCookie(
    res: Response,
    refreshToken: string
  ): Promise<void> {
    const timeData: Record<string, number> = {
      days : 30,
      hours: 24,
      minutes: 60,
      seconds: 60,
      miliseconds: 1000,
    };
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: timeData.days * timeData.hours * timeData.minutes * timeData.seconds * timeData.miliseconds,
      sameSite: 'lax',
    });
  }

  public async removeRefreshTokenCookie(res: Response): Promise<void> {
    res.clearCookie('refreshToken');
  }
}
