import { EntityType } from '../../types/entity-type.type';
import UserSafeDto from '../users/user-safe.dto';

type LikeInputDto = {
  user: UserSafeDto;
  entityType: EntityType;
  id: number;
};

export default LikeInputDto;
