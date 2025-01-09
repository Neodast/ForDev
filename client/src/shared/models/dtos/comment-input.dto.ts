import { User } from '../entities/user.entity';
import { EntityType } from '../types/entity-type.type';

export type CommentInputDto = {
  id: number;
  entityType: EntityType;
  text: string;
  author: User;
};
