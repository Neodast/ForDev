import Role from '../../utils/enums/roles.enum';

export default interface TokenPayloadDto {
  id: string;
  email: string;
  role: Role;
}
