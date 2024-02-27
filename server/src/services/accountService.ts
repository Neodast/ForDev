import emailService from './emailService';
import tokenService from './tokenService';
import UserCreateDto from '../models/dto/UserDtos/userCreate.dto';
import UserLoginDto from '../models/dto/AuthDtos/userLoginInput.dto';
import TokenPayloadDto from '../models/dto/TokenDtos/tokenPayload.dto';
import bcrypt from 'bcrypt';
import LoginOutputDto from '../models/dto/AuthDtos/loginOutput.dto';
import ApiError from '../utils/exeptions/apiError';
import UserLoginOutputDto from '../models/dto/AuthDtos/userLoginOutput.dto';
import userPgRepository from '../repositories/PostgreSQL/userPgRepository';
import UserRegisterDto from '../models/dto/AuthDtos/userRegisterOutput.dto';
import IUserRepository from '../repositories/IUserRepository';
import tokenPgRepository from '../repositories/PostgreSQL/tokenPgRepository';
import ITokenRepository from '../repositories/ITokenRepository';
import UserDto from '../models/dto/UserDtos/user.dto';
import TokensOutputDto from '../models/dto/TokenDtos/tokensOutput.dto';

class AccountService {
  private readonly userRepository: IUserRepository = userPgRepository;
  private readonly tokenRepository: ITokenRepository = tokenPgRepository;

  async register(user: UserCreateDto): Promise<UserRegisterDto> {
    const hashedPassword = await bcrypt.hash(user.password, 3);

    const createdUser = await this.userRepository.createUser({
      email: user.email,
      password: hashedPassword,
      name: user.name,
      surname: user.surname,
    });

    const tokenPayload: TokenPayloadDto = {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    };

    const tokens = await tokenService.generateTokens(tokenPayload);

    await tokenService.saveToken(createdUser.id, tokens.refreshToken);

    const verificationLink = `${process.env.API_URL}/auth/verify/?id=${createdUser.id}`;

    await emailService.sendActivateEmail(createdUser.email, verificationLink);

    return { tokens, user };
  }

  async login(userData: UserLoginDto): Promise<LoginOutputDto> {
    const user = await this.userRepository.getByEmail(userData.email);

    if (!user.isVerified) {
      throw ApiError.BadRequest('User is not verify');
    }

    const isValidPassword = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!isValidPassword) {
      throw ApiError.BadRequest('Incorrected password');
    }

    const tokens = await tokenService.createTokens(user);

    return {user, tokens}
  }

  async refresh(refreshToken: string): Promise<LoginOutputDto> {
    if (!refreshToken) {
      throw ApiError.BadRequest('Refresh-token is not found');
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDatabase = await this.tokenRepository.getByRefreshToken(
      refreshToken
    );

    if (!tokenFromDatabase) {
      throw ApiError.BadRequest('Refresh-token is alredy delete');
    }

    const user = await this.userRepository.getById(userData.id);

    const tokenPayload: TokenPayloadDto = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const tokens = await tokenService.generateTokens(tokenPayload);

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async verify(linkId: string): Promise<void> {
    const userData = await this.userRepository.getById(linkId);
    userData.isVerified = true;
    this.userRepository.updateUser(linkId, userData);
  }

  async logout(refreshToken: string): Promise<void> {
    await tokenService.deleteToken(refreshToken);
  }

  async getAllUsers() : Promise<Array<UserDto>> {
    const users = await this.userRepository.getAll();
    return users;
  }
}

export default new AccountService();
