import UserModelDto from '../UserDtos/userModel.dto';
import { User } from '../../userEntity';

interface TokenModelDto {
  id: number;
  refreshToken: string;
}

export default TokenModelDto;
