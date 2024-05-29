import emailService from './email.service';
import tokenService from './token.service';
import UserCreateDto from '../../utils/dtos/users/user-create.dto';
import UserLoginDto from '../../utils/dtos/auth/user-login-input.dto';
import TokenPayloadDto from '../../utils/dtos/tokens/token-payload.dto';
import bcrypt from 'bcrypt';
import LoginOutputDto from '../../utils/dtos/auth/login-output.dto';
import ApiError from '../../utils/exceptions/api-error';
import userPgRepository from '../../db/dbRepositories/user.repository';
import UserRegisterDto from '../../utils/dtos/auth/user-register-output.dto';
import UserRepository from '../repositories/user.repository.type';
import tokenPgRepository from '../../db/dbRepositories/token.repository';
import TokenRepository from '../repositories/token.repository.type';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import UserMapper from '../mappers/user.mapper';

class UserService {
  constructor(
    readonly userRepository: UserRepository,
    readonly tokenRepository: TokenRepository,
  ) {}

  async register(user: UserCreateDto): Promise<UserRegisterDto> {
    const hashedPassword = await bcrypt.hash(user.password, 3);

    const createdUser = await this.userRepository.createUser({
      email: user.email,
      password: hashedPassword,
      name: user.name,
      surname: user.surname,
      nickname: user.nickname,
    });

    const tokenPayload: TokenPayloadDto = {
      ...createdUser,
    };

    const tokens = await tokenService.generateTokens(tokenPayload);

    await tokenService.saveToken(createdUser.id, tokens.refreshToken);

    const verificationLink = `${process.env.API_URL}/auth/verify/?id=${createdUser.id}`;

    await emailService.sendActivateEmail(createdUser.email, verificationLink);

    return { tokens, user };
  }

  async login(userData: UserLoginDto): Promise<LoginOutputDto> {
    const dbUser = await this.userRepository.getByEmail(userData.email);

    if (!dbUser.isVerified) {
      throw ApiError.BadRequest('User is not verified');
    }

    const isValidPassword = await bcrypt.compare(
      userData.password,
      dbUser.password,
    );

    if (!isValidPassword) {
      throw ApiError.BadRequest('Incorrected password');
    }

    const tokens = await tokenService.createTokens(dbUser);
    const user: UserSafeDto = UserMapper.mapToUserSafeDto(dbUser);

    return { user, tokens };
  }

  async refresh(refreshToken: string): Promise<LoginOutputDto> {
    if (!refreshToken) {
      throw ApiError.BadRequest('Refresh-token is not found');
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const dbToken = await this.tokenRepository.getByRefreshToken(refreshToken);

    if (!dbToken) {
      throw ApiError.BadRequest('Refresh-token is alredy delete');
    }

    const user = await this.userRepository.getById(userData.id);

    const tokenPayload: TokenPayloadDto = {
      ...user,
    };

    const tokens = await tokenService.generateTokens(tokenPayload);

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async verify(linkId: string): Promise<void> {
    const userData = await this.userRepository.getById(linkId);
    userData.isVerified = true;
    await this.userRepository.updateUser(linkId, userData);
  }

  async logout(refreshToken: string): Promise<void> {
    await tokenService.deleteToken(refreshToken);
  }

  async getAllUsers(): Promise<UserCreateDto[]> {
    return this.userRepository.getAll();
  }
}

export default new UserService(userPgRepository, tokenPgRepository);
