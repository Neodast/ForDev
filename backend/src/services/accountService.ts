import userService from './userService';
import emailService from './emailService';
import tokenService from './tokenService';
import UserCreateDto from '../dto/userCreate.dto';
import UserLoginDto from '../dto/userLogin.dto';
import TokenPayloadDto from '../dto/tokenPayload.dto';
import bcrypt from 'bcrypt';
import { UUID, randomUUID } from 'crypto';

class AccountService {
  async registration(user: UserCreateDto) {
    const candidate = await userService.getByEmail(user.email);
    if (candidate) {
      throw new Error('User undefined');
    }

    const hashedPassword = await bcrypt.hash(user.password, 3);

    const activationLink = randomUUID();

    const createdUser = await userService.create({
      email: user.email,
      password: hashedPassword,
      name: user.name,
      surname: user.surname,
    });

    await emailService.sendActivateEmail(user.email, activationLink);

    const tokenPayload: TokenPayloadDto = {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    };
    const tokens = await tokenService.generateTokens(tokenPayload);

    await tokenService.saveToken(createdUser.id, tokens.refreshToken);

    return {
      ...tokens,
      createdUser,
    };
  }
}

export default new AccountService();
