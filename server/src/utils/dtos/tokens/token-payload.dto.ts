import Role from '../../enums/roles.enum';

interface TokenPayloadDto {
  id: string;
  email: string;
  role: Role;
}

export default TokenPayloadDto;
