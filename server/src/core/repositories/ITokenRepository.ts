import TokenModel from '../models/TokenModel';
interface ITokenRepository {
  getByUserId(userId: string): Promise<TokenModel>;
  getByRefreshToken(refreshToken: string): Promise<TokenModel>;
  createRefreshToken(userId: string, refreshToken: string): Promise<TokenModel>;
  updateRefreshToken(
    refreshToken: TokenModel,
    newRefresh: string,
  ): Promise<TokenModel>;
  deleteRefreshToken(refreshToken: string): Promise<void>;
}

export default ITokenRepository;
