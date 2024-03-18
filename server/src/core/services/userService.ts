import emailService from './emailService';
import tokenService from './tokenService';
import UserCreateDto from '../../utils/dtos/userDtos/userCreate.dto';
import UserLoginDto from '../../utils/dtos/authDtos/userLoginInput.dto';
import TokenPayloadDto from '../../utils/dtos/tokenDtos/tokenPayload.dto';
import bcrypt from 'bcrypt';
import LoginOutputDto from '../../utils/dtos/authDtos/loginOutput.dto';
import ApiError from '../../utils/exeptions/apiError';
import userPgRepository from '../../db/dbRepositories/postgreSQL/pgUserRepository';
import UserRegisterDto from '../../utils/dtos/authDtos/userRegisterOutput.dto';
import IUserRepository from '../repositories/IUserRepository';
import tokenPgRepository from '../../db/dbRepositories/postgreSQL/pgTokenRepository';
import ITokenRepository from '../repositories/ITokenRepository';
import UserSafeDto from '../../utils/dtos/userDtos/userSafe.dto';
import UserMapper from '../mappers/userMappers';

class UserService {
  constructor(
    readonly userRepository: IUserRepository,
    readonly tokenRepository: ITokenRepository,
  ) {}

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

    const tokenFromDatabase =
      await this.tokenRepository.getByRefreshToken(refreshToken);

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
