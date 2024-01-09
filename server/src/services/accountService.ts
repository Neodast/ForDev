import userService from './userService';
import emailService from './emailService';
import tokenService from './tokenService';
import UserCreateDto from '../dto/userCreate.dto';
import UserLoginDto from '../dto/userLogin.dto';
import TokenPayloadDto from '../dto/tokenPayload.dto';
import bcrypt from 'bcrypt';
import { UUID, randomUUID } from 'crypto';

class AccountService {
  async register(user: UserCreateDto) {
    const candidate = await userService.getByEmail(user.email);

    if (candidate) {
      throw new Error('User undefined');
    }

    const hashedPassword = await bcrypt.hash(user.password, 3);

    const createdUser = await userService.create({
      email: user.email,
      password: hashedPassword,
      name: user.name,
      surname: user.surname,
    });

    const verificationLink = `${process.env.API_URL}/auth/verify/${createdUser.id}`;

    await emailService.sendActivateEmail(createdUser.email, verificationLink);

    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      surname: createdUser.surname,
    };
  }

  async login(userData: UserLoginDto) {
    const candidate = await userService.getByEmail(userData.email);

    if (!candidate) {
      throw new Error('User undefined');
    }

    const isValidPassword = await bcrypt.compare(
      userData.password,
      candidate.password
    );

    if (!isValidPassword) {
      throw new Error('Uncorrected pass!');
    }

    const tokenPayload: TokenPayloadDto = {
      id: candidate.id,
      email: candidate.email,
      role: candidate.role,
    };
    const tokens = await tokenService.generateTokens(tokenPayload);

    await tokenService.saveToken(candidate.id, tokens.refreshToken);

    return {
      tokens,
      user: {
        id: candidate.id,
        email: candidate.email,
        name: candidate.name,
        surname: candidate.surname,
      },
    };
  }
  async logout(refreshToken: string) {
    await tokenService.deleteToken(refreshToken);
  }
}

export default new AccountService();
