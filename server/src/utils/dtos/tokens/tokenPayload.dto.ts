import Role from '../../enums/Roles.enum';

interface TokenPayloadDto {
  id: string;
  email: string;
  role: Role;
}

export default TokenPayloadDto;
