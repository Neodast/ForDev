import TokenModel from '../models/tokenModel';
interface ITokenRepository {
  getByUserId(userId: string): Promise<TokenModel>;
  getByRefreshToken(refreshToken: string): Promise<TokenModel>;
  createRefreshToken(userId: string, refreshToken: string): Promise<TokenModel>;
  updateRefreshToken(
    refreshToken: TokenModel,
    newRefresh: string
  ): Promise<TokenModel>;
  deleteRefreshToken(tokenId: number): Promise<void>;
}

export default ITokenRepository;
