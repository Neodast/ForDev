import userService from './userService';
import emailService from './emailService';
import tokenService from './tokenService';
import UserCreateDto from '../models/dto/userCreate.dto';
import UserLoginDto from '../models/dto/userLoginInput.dto';
import TokenPayloadDto from '../models/dto/tokenPayload.dto';
import bcrypt from 'bcrypt';
import { UUID, randomUUID } from 'crypto';
import LoginOutputDto from '../models/dto/loginOutput.dto';
import ApiError from '../utils/exeptions/apiError';
import UserLoginOutputDto from '../models/dto/userLoginOutput.dto';

class AccountService {
  async register(user: UserCreateDto) {
    const hashedPassword = await bcrypt.hash(user.password, 3);

    const createdUser = await userService.create({
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

    return {
      tokens: {
        refreshToken: tokens.refreshToken,
      },
      user: {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        surname: createdUser.surname,
      },
    };
  }

  async login(userData: UserLoginDto): Promise<UserLoginOutputDto> {
    const candidate = await userService.getByEmail(userData.email);

    if (!candidate) {
      throw ApiError.BadRequest('User is not found');
    }

    if (!candidate.isVerified) {
      throw ApiError.BadRequest('User is not verify');
    }

    const isValidPassword = await bcrypt.compare(
      userData.password,
      candidate.password
    );

    if (!isValidPassword) {
      throw ApiError.BadRequest('Incorrected password');
    }

    return candidate;

    // return {
    //   user: {
    //     id: candidate.id,
    //     email: candidate.email,
    //     name: candidate.name,
    //     surname: candidate.surname,
    //   },
    // };
  }

  async refresh(refreshToken: string): Promise<LoginOutputDto> {
    if (!refreshToken) {
      throw ApiError.BadRequest('Refresh-token is not found');
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDatabase = await tokenService.getByRefreshToken(
      refreshToken
    );

    if (!tokenFromDatabase) {
      throw ApiError.BadRequest('Refresh-token is alredy delete');
    }

    const user = await userService.getById(userData.id);

    if (!user) {
      throw ApiError.BadRequest('User is not found');
    }

    const tokenPayload: TokenPayloadDto = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const tokens = await tokenService.generateTokens(tokenPayload);

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { user, tokens };
    // return {
    //   tokens: {
    //     accessToken: tokens.accessToken,
    //     refreshToken: tokens.refreshToken,
    //   },
    //   user: {
    //     id: user.id,
    //     email: user.email,
    //     name: user.name,
    //     surname: user.surname,
    //     role: user.role,
    //   },
    // };
  }

  async verify(linkId: string) {
    const userData = await userService.getById(linkId);
    if (!userData) {
      throw ApiError.BadRequest('Verify link is not found');
    }
    userService.verify(linkId);
  }

  async logout(refreshToken: string) {
    await tokenService.deleteToken(refreshToken);
  }
}

export default new AccountService();
