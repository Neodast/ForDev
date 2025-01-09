import { EntityType } from '@/shared/models/types/entity-type.type';
import { User } from './user.entity';

export type Like = {
  id: number;
  entityType: EntityType;
  user: User;
};
