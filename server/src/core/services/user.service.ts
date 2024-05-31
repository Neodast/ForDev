import UserCreateDto from '../../utils/dtos/users/user-create.dto';
import UserLoginDto from '../../utils/dtos/auth/user-login-input.dto';
import TokenPayloadDto from '../../utils/dtos/tokens/token-payload.dto';
import bcrypt from 'bcrypt';
import LoginOutputDto from '../../utils/dtos/auth/login-output.dto';
import ApiError from '../../utils/exceptions/api-error';
import UserRegisterDto from '../../utils/dtos/auth/user-register-output.dto';
import UserRepository from '../repositories/user.repository.type';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import UserMapper from '../mappers/user.mapper';
import { inject, injectable } from 'inversify';
import { UserTypes } from '../../utils/types/containers/user.types';
import { TokenTypes } from '../../utils/types/containers/token.types';
import TokenService from './token.service';
import { EmailTypes } from '../../utils/types/containers/email.types';
import EmailService from './email.service';

@injectable()
class UserService {
  constructor(
    @inject(UserTypes.UserRepository) private userRepository: UserRepository,
    @inject(TokenTypes.TokenService) private tokenService: TokenService,
    @inject(EmailTypes.EmailService) private emailService: EmailService,
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

    const tokens = await this.tokenService.generateTokens(tokenPayload);

    await this.tokenService.saveToken(createdUser.id, tokens.refreshToken);

    const verificationLink = `${process.env.API_URL}/auth/verify/?id=${createdUser.id}`;

    await this.emailService.sendActivateEmail(
      createdUser.email,
      verificationLink,
    );

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

    const tokens = await this.tokenService.createTokens(dbUser);
    const user: UserSafeDto = UserMapper.mapToUserSafeDto(dbUser);

    return { user, tokens };
  }

  async refresh(refreshToken: string): Promise<LoginOutputDto> {
    if (!refreshToken) {
      throw ApiError.BadRequest('Refresh-token is not found');
    }

    const userData = this.tokenService.validateRefreshToken(refreshToken);

    const dbToken = await this.tokenService.getByRefreshToken(refreshToken);

    if (!dbToken) {
      throw ApiError.BadRequest('Refresh-token is alredy delete');
    }

    const user = await this.userRepository.getById(userData.id);

    const tokenPayload: TokenPayloadDto = {
      ...user,
    };

    const tokens = await this.tokenService.generateTokens(tokenPayload);

    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return { user, tokens };
  }

  async verify(linkId: string): Promise<void> {
    const userData = await this.userRepository.getById(linkId);
    userData.isVerified = true;
    await this.userRepository.updateUser(linkId, userData);
  }

  async logout(refreshToken: string): Promise<void> {
    await this.tokenService.deleteToken(refreshToken);
  }

  async getAllUsers(): Promise<UserCreateDto[]> {
    return this.userRepository.getAll();
  }
}

export default UserService;
