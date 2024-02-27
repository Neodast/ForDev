import TokenModelDto from '../models/dto/TokenDtos/tokenModel.dto';
interface ITokenRepository {
  getByUserId(userId: string): Promise<TokenModelDto>;
  getByRefreshToken(refreshToken: string): Promise<TokenModelDto>;
  createRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<TokenModelDto>;
  updateRefreshToken(
    refreshToken: TokenModelDto,
    newRefresh: string
  ): Promise<TokenModelDto>;
  deleteRefreshToken(tokenId: number): Promise<void>;
}

export default ITokenRepository;
