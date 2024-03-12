import UserModelDto from './userModel';
import { User } from '../../db/entities/userEntity';

interface TokenModelDto {
  id: number;
  refreshToken: string;
}

export default TokenModelDto;
